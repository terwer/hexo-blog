---
title: '[精华]使用NRWL-NX-workspace创建一个Node-js-命令行库'
updated: '2023-03-30 01:03:11'
excerpt: >-
  在这篇文章中，我会分享我在思源笔记 zhi
  主题开发过程中创建命令行库时精确的开发流程。这个统一的开发栈帮助我在我的各个子项目之间共享库时减少了大量重复工作和时间。
tags:
  - 使用
  - 创建
  - 工作
  - 一个
  - 命令
  - zhi
  - zhi-cli
categories:
  - _posts
permalink: /post/use-nrwlnxworkspace-to-create-a-nodejscommand-line-library-1urtj8.html
comments: true
toc: true
---



## 为什么要费心写另一篇关于 CLI 库的文章呢？

有无数关于创建 Node.js 命令行库的文章可用，而本文并不尝试重新发明轮子。它被作为一个统一的工作流，专门为 zhi 主题所采用并为 zhi 所使用的技术堆栈进行了量身定制：NRWL NX 工作区、语义化版本控制、GitHub actions、GitHub packages、多分发渠道（即功能/预发布分支）以及 Netlify/Vercel 服务。

在这篇文章中，我会分享我在 [思源笔记 zhi 主题](https://github.com/terwer/zhi) 开发过程中创建命令行库时精确的开发流程。这个统一的开发栈帮助我在我的各个子项目之间共享库时减少了大量重复工作和时间。

## 阅读本文对我有什么好处？

本文将指导您如何：

1. 创建一个基于 NX 的工作区
2. 在 NX 工作区中创建一个 Typescript 的  Vite 项目
3. 将该项目暴露为 node.js CLI 执行项目
4. 转译为 ESM 模块
5. 将代码分割成命令

文章末尾有一些跟进文章：

1. 使用 GitHub Actions 自动将库发布到 NPM 仓库中。
2. 在开发机器上使用环境参数运行库。

一个可运行的例子可以在 [terwer/zhi](https://github.com/terwer/zhi/tree/dev/packages/zhi-cli "zhi-cli") 中找到。

## 先决条件

请确保您正在使用 Node 版本 >= 16。

顺带一提，为了在您的计算机上使用多个 Node 版本，如果您未使用 [nvm-sh/nvm：Node 版本管理器](https://github.com/nvm-sh/nvm#automatically-call-nvm-use)，我建议您尝试一下。

设置工作区

创建新的 NX 工作区。

```bsah
npx create-nx-workspace@latest
```

当询问时，请选择选项 `integrated monorepo > ts`​ 。

create-nx-workspace 脚本会创建一个以您提供的项目名称命名的文件夹。进入新创建的文件夹。

添加 `.nvmrc`​ 文件并将内容设置为所需的 Node.js 版本号。例如，如果您正在使用 Node v16：

```
16
```

现在，请运行以下命令在工作区中创建一个基于 Vite 的新项目。

```bash
## Create a Vite project
nx generate @nrwl/js:library zhi-cli --publishable --importPath=zhi-cli  --bundler=vite

## Add Vitest support
## In the selection option select Vitest as Unit test framework
```

在文件 `packages/zhi-cli/package.json`​ 中：

* 将版本设置为 `1.0.0`​.
* 让脚本可执行。

  ```
  "bin": "./index.js"
  ```

注意：一旦部署到 [NPM](https://npmjs.com/)，您将可以使用其名称运行该库，例如通过运行 `npx zhi-cli --help`​ 。

* 添加一些脚本，这些脚本可以在开发过程中帮助你。注意：在根目录加，不是子项目。

  ```json
  {
    "name": "zhi",
    "version": "1.0.0",
    "license": "GPL",
    "type": "module",
    "scripts": {
      "dev:zhi-cli": "node --experimental-specifier-resolution=node --loader ts-node/esm packages/zhi-cli/index.ts",
      "watch:zhi-cli": "nx run zhi-cli:build --watch",
      "cli:zhi-cli": "node --experimental-specifier-resolution=node dist/packages/zhi-cli"
    },
  }
  ```

注意：上面我们设置了 `"type": "module"`​​ , 这样保证直接 ESM 的方式运行 js 文件，否则就需要设置文件后缀名为 mjs。

还有：如果直接运行 ts 文件，还需要安装 `ts-node`​ 。

在文件 `packages/cli/tsconfig.lib.json` ​中添加一个标志以避免 Typescript 错误，当库没有导出默认对象时。

```json
{
  compilerOptions { 
    "allowSyntheticDefaultImports": true 
  }
}
```

在文件 `packages/zhi-cli/project.json` ​中，当构建包时，您应该指示 NX 将包使用的依赖项包含在生成的 package.json 中。

```
"targets": {
    "build": {
        "updateBuildableProjectDepsInPackageJson": true,  
        "buildableProjectDepsInPackageJsonType": "dependencies"
    }
}
```

## 将库转换为为 ES 模块

要导入 ES 模块库，你的库也应该是 ==ES 模块==。有关更多信息，请参见 [@nrwl/node 应用程序未转换为 esm · Issue #10296 · nrwl/nx](https://github.com/nrwl/nx/issues/10296) 。请通过以下步骤进行：

* 在文件 `packages/zhi-cli/package.json`​ 中添加 `"type": "module"`​ ，这个在上面一步已经说过了。

* 在文件 `packages/zhi-cli/tsconfig.json`​ 中，将 `module`​ 值更改为 `esnext`​。

* 在文件 `tsconfig.base.json` ​中，将 `target`​ 编译器值更改为 `esnext`​。

## 创建初始 CLI 命令

> 在继续指南之前，现在是将您的工作区提交到 Github 的好时机。

在前面的部分，您创建了一个工作区并准备好了您的命令。现在是添加命令的时候了。

library 的推荐结构：

```
packages
├── zhi-cli
│   ├── package.json
│   ├── project.json
│   ├── README.md
│   ├── src
│   │   ├── index.ts
│   │   └── lib
│   │       ├── zhi-cli.spec.ts
│   │       ├── zhi-cli.ts
│   │       ├── {command-name}                    (folder)
│   │       │       ├── command.ts
│   │       └── {another-command-name}     (folder)
│   │                  ├── command.ts
│   ├── tsconfig.json
│   ├── tsconfig.lib.json
│   ├── tsconfig.spec.json
│   └── vite.config.ts
```

在本文中，我们将创建一个名为 `init`​ 的命令，除了写入控制台外，什么也不做。

## 安装推荐的库

许多优秀的库可被用于提供丰富且友好的命令行用户体验。

在本文中，我们将安装一些必备的库。

1. [commander - npm](https://www.npmjs.com/package/commander) - 必备的一个库，可让您定义命令及其参数、选项、帮助等。
2. [debug - npm](https://www.npmjs.com/package/debug) - 必备的一个流行库，可用于编写调试日志。
3. [fast-glob - npm](https://www.npmjs.com/package/fast-glob) - 推荐的一个高速高效的 Glob 库。
4. [inquirer - npm](https://www.npmjs.com/package/inquirer) - 推荐的一个常见交互式命令行用户界面的集合。

安装所需的库（可以添加更多）。

```bash
pnpm add commander debug
pnpm add @types/debug @types/node -D
```

## 添加初始命令代码

新建 `src/lib/utils.ts` ​文件

将以下内容复制到 utils 文件中。

```bash
import Debug from "debug"

export const rootDebug = Debug("zhi-cli")

export const printVerboseHook = (thisCommand: any) => {
  const options = thisCommand.opts()

  if (options.verbose) {
    Debug.enable("zhi-cli*")
    rootDebug(`CLI arguments`)
    rootDebug(options)
  }
}
```

### `src/lib/init/command.ts`​ 文件

请复制以下模板并根据需要进行调整。

```ts
import * as fs from "fs"
import { Command } from "commander"
import { printVerboseHook, rootDebug } from "../utils"
import * as process from "process"

// remember to name the folder of this file as the command name

const debug = rootDebug.extend("init")
const debugError = rootDebug.extend("init:error")

export const initCommand = () => {
  const command = new Command("init")
  command
    .argument("[path]", "directory to do something with")
    .option("--verbose", "output debug logs", false)
    .option("--target <name>", "the target name", "node")
    // .requiredOption('--includeDirectories', 'copy directories')
    .hook("preAction", printVerboseHook)
    .action(async (path, options) => {
      if (path && !fs.existsSync(path)) {
        debugError("invalid path provided")
        process.exit(1)
      }

      debug(`Zhi-cli is executing now....`)
    })
  return command
}

```

### `src/lib/zhi-cli.ts`​ 文件

创建文件并添加以下内容：

```ts
import { Command } from "commander"
import { initCommand } from "./init/commnd"

const program = new Command()
program.name("Zhi project creator").description("Create projects for zhi theme")

program.addCommand(initCommand())

program.parse(process.argv)
```

## 配置 Vite 支持 Node

这一步非常重要，否则后面的无法运行，修改 `vite.config.ts`​ ，这里需要添加 `external`​ 和 `output.banner`​ 。

```js
 build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: "src/index.ts",
      name: "zhi-cli",
      fileName: "index",
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: ["fs", "path", "process", "events"],
      output: {
        banner: "#! /usr/bin/env node",
      },
    },
```

## 测试命令

先运行 `nx build zhi-cli`​

```bash
➜  zhi git:(dev) ✗ nx build zhi-cli

> nx run zhi-cli:build

vite v4.2.1 building for production...
```

然后运行以下命令 `node --experimental-specifier-resolution=node dist/packages/zhi-cli init --verbose`​​。

```bash
➜  zhi git:(dev) ✗ node --experimental-specifier-resolution=node dist/packages/zhi-cli init --verbose
(node:14065) ExperimentalWarning: The Node.js specifier resolution flag is experimental. It could change or be removed at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
zhi-cli CLI arguments +0ms
zhi-cli { verbose: true, target: 'node' } +1ms
zhi-cli:init Zhi-cli is executing now.... +0ms
```

或者 `pnpm cli:zhi-cli`​

```bash
➜  zhi git:(dev) ✗ pnpm cli:zhi-cli  

> zhi@1.0.0 cli:zhi-cli /home/terwer/Documents/mydocs/zhi
> node --experimental-specifier-resolution=node dist/packages/zhi-cli

(node:15205) ExperimentalWarning: The Node.js specifier resolution flag is experimental. It could change or be removed at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
Usage: Zhi project creator [options] [command]

Create projects for zhi theme

Options:
  -h, --help             display help for command

Commands:
  init [options] [path]
  help [command]         display help for command
 ELIFECYCLE  Command failed with exit code 1.
➜  zhi git:(dev) 
```

运行 `init`​

```bash
➜  zhi git:(dev) pnpm cli:zhi-cli init --verbose

> zhi@1.0.0 cli:zhi-cli /home/terwer/Documents/mydocs/zhi
> node --experimental-specifier-resolution=node dist/packages/zhi-cli "init" "--verbose"

(node:16121) ExperimentalWarning: The Node.js specifier resolution flag is experimental. It could change or be removed at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
zhi-cli CLI arguments +0ms
zhi-cli { verbose: true, target: 'node' } +1ms
zhi-cli:init Zhi-cli is executing now.... +0ms
➜  zhi git:(dev) ➜
```

## 命令行测试命令

你可以以类似于部署应用的行为方式进行测试。

确保您构建了项目。

在终端中，导航到 `dist/packages/zhi-cli`​ ，然后运行 `npm link`​ 命令。

```bash
cd dist/packages/zhi-cli
npm link
## for linux, like Debian, Ubuntu, Deepin, UOS, you should use the following command
## sudo npm link
```

完成后，您可以导航返回根文件夹。

```bash
➜  zhi-cli git:(dev) sudo npm link       
请输入密码:
验证成功

added 1 package in 713ms
```

使用 npx 运行这个库。例如，`npx zhi-cli`​：

```
➜  zhi-cli git:(dev) npx zhi-cli
Usage: Zhi project creator [options] [command]

Create projects for zhi theme

Options:
  -h, --help             display help for command

Commands:
  init [options] [path]
  help [command]         display help for command
➜  zhi-cli git:(dev)
```

### [   ](https://dev.to/eransakal/create-a-nodejs-command-line-library-with-nrwl-nx-workspace-5hin#test-the-command-3)   Test the command #3

Once deployed to the NPM registry, you can run it without downloading the library using NPX. This is a recommended way if your library is not tight the workflow of the libraries/apps that consume it.

## [   ](https://dev.to/eransakal/create-a-nodejs-command-line-library-with-nrwl-nx-workspace-5hin#providing-powerful-ux-that-people-will-appreciate)   Providing powerful UX that people will appreciate

> The javascript ecosystem is amazing and lets you make your application shine by consuming other libraries. Still, remember that you increase the potential for security vulnerabilities when you rely more and more on 3rd party libraries.

I'm using two libraries to improve my project's UX significantly. You can check my usage with them in [esakal/obsidian-album](https://github.com/esakal/obsidian-album).

### [   ](https://dev.to/eransakal/create-a-nodejs-command-line-library-with-nrwl-nx-workspace-5hin#multiple-ways-to-configure-your-library)   Multiple ways to configure your library

There is a fantastic library [davidtheclark/cosmiconfig: Find and load configuration from a package.json property, rc file, or CommonJS module](https://github.com/davidtheclark/cosmiconfig) that does all the tedious work for you.

Cosmiconfig searches for and loads configuration for your program. For example, if your module's name is `myapp`​, cosmiconfig will search up the directory tree for configuration in the following places:

* a `myapp`​ property in `package.json`​
* a `.myapprc`​ file in JSON or YAML format
* a `.myapprc.json`​, `.myapprc.yaml`​, `.myapprc.yml`​, `.myapprc.js`​, or `.myapprc.cjs`​ file
* a `myapprc`​, `myapprc.json`​, `myapprc.yaml`​, `myapprc.yml`​, `myapprc.js`​ or `myapprc.cjs`​ file inside a `.config`​ subdirectory
* a `myapp.config.js`​ or `myapp.config.cjs`​ CommonJS module exporting an object

### [   ](https://dev.to/eransakal/create-a-nodejs-command-line-library-with-nrwl-nx-workspace-5hin#interact-with-the-users-using-a-friendly-interface)   Interact with the users using a friendly interface

The library [inquirer - npm](https://www.npmjs.com/package/inquirer) is a collection of common interactive command line user interfaces. Some people struggle with arguments, especially when having many of them. Instead, they prefer to interact with the library, and the inquirer does precisely that.

It works great for `create-react-app`​, `create-nx-workspace`​, and many others, so it should also work for you.

## [   ](https://dev.to/eransakal/create-a-nodejs-command-line-library-with-nrwl-nx-workspace-5hin#whats-next)   Whats next

That is it. You are now ready to add the library logic. Feel free to reach out and ask questions in dev.to

## [   ](https://dev.to/eransakal/create-a-nodejs-command-line-library-with-nrwl-nx-workspace-5hin#additional-resources)   Additional resources

Read [How to deploy automatically to NPM and Github packages from NRWL NX workspace](https://sakalim.com/content/how-to-deploy-automatically-to-npm-and-github-packages-from-nrwl-nx-workspace) to support automatic deployments using GitHub Actions and Semantic Releases.

Read [Handy tips when working on CLI library during development](https://sakalim.com/content/handy-tips-when-working-on-cli-library-during-development) to learn about some helpful development techniques.

Read [How to use private GitHub packages in your repository and with Github Actions](https://sakalim.com/content/how-to-use-private-github-packages-in-your-repository-and-with-github-actions) if you are using GitHub packages in your workflow.

---

Photo by [Paul Esch-Laurent](https://unsplash.com/@pinjasaur?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/oZMUrWFHOB4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

## 参考

[https://dev.to/eransakal/create-a-nodejs-command-line-library-with-nrwl-nx-workspace-5hin](https://dev.to/eransakal/create-a-nodejs-command-line-library-with-nrwl-nx-workspace-5hin)

‍
