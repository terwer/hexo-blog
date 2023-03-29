---
title: 使用NRWL-NX-workspace创建一个Node-js-命令行库
updated: '2023-03-29 17:00:23'
excerpt: >-
  为什么要费心写另一篇关于cli库的文章呢？有无数关于创建nodejs命令行库的文章可用而本文并不尝试重新发明轮子。它被作为一个统一的工作流专门为我们组所采用并在产品中使用的技术堆栈量身定制_nrwlnx工作区语义化版本控制githubactionsgithubpackages多分发渠道（即功能预发布分支）以及netlifyvercel服务。在这篇文章中我会分享我在思源笔记zhi主题开发过程中创建命令行库时精确的开发流程。这个统一的开发栈帮助我在我的各个子项目之间共享库时减少了大量重复工作和时间。阅读本文对
tags:
  - 使用
  - 创建
  - 工作
  - 一个
  - 命令
categories: []
permalink: /post/use-nrwlnxworkspace-to-create-a-nodejscommand-line-library-1urtj8.html
comments: true
---



## 为什么要费心写另一篇关于 CLI 库的文章呢？

有无数关于创建 Node.js 命令行库的文章可用，而本文并不尝试重新发明轮子。它被作为一个统一的工作流，专门为我们组所采用并在产品中使用的技术堆栈量身定制：NRWL NX 工作区、语义化版本控制、GitHub actions、GitHub packages、多分发渠道（即功能/预发布分支）以及 Netlify/Vercel 服务。

在这篇文章中，我会分享我在 [思源笔记 zhi 主题](https://github.com/terwer/zhi) 开发过程中创建命令行库时精确的开发流程。这个统一的开发栈帮助我在我的各个子项目之间共享库时减少了大量重复工作和时间。

## 阅读本文对我有什么好处？

本文将指导您如何：

1. 创建一个基于 NX 的工作区
2. 在 NX 工作区中创建一个 Typescript 的  Node 项目
3. 将该项目暴露为 node.js CLI 执行项目
4. 转译为 ESM 模块
5. 将代码分割成命令

文章末尾有一些跟进文章：

1. 使用 GitHub Actions 自动将库部署到 NPM 注册表中。
2. 在开发机器上使用环境参数运行库。

一个可行的例子可以在 [terwer/zhi](https://github.com/terwer/zhi/tree/dev/packages/zhi-cli "zhi-cli") 中找到。

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

添加 `.nvmrc`​ 文件并将内容设置为所需的 Node.js 版本号。例如，如果您正在使用 Node v18：

```
18
```

现在，请运行以下命令在工作区中创建一个基于 Vite 的新项目。

```bash
## Create a Vite project
nx generate @nrwl/js:library zhi-cli --publishable --importPath=zhi-cli  --bundler=vite

## Add Vitest support
## In the selection option select Vitest as Unit test framework
```

In file `packages/cli/package.json`​:

* set version to `1.0.0`​.
* make the script executable

```
"bin": "./src/cli.js"
```

Note: once deployed to [NPM](https://npmjs.com/), you will then be able to run the library using its name, for example by running `npx obsidian-album --help`​

* add some scripts that will help you during the development

```
"scripts": {  
  "build": "nx run cli:build",  
  "watch": "nx run cli:build --watch",
  "cli": "node dist/packages/cli"
},
```

In file `packages/cli/tsconfig.lib.json`​
Add a flag to avoid the Typescript error when a library doesn't export a default object.

```
compilerOptions { "allowSyntheticDefaultImports": true }}
```

In file `packages/cli/tsconfig.lib.json`​
This step is optional. If you plan to mix `.ts`​ files with `.js`​ files:

```
"compilerOptions": {
    "allowJs": true
}
```

In file `packages/cli/project.json`​
You should instruct NX to include the dependencies used by the package in the generated package.json when building the package.

```
"targets": {
    "build": {
        "updateBuildableProjectDepsInPackageJson": true,  
        "buildableProjectDepsInPackageJsonType": "dependencies"
    }
}
```

### [   ](https://dev.to/eransakal/create-a-nodejs-command-line-library-with-nrwl-nx-workspace-5hin#transpile-the-library-to-es-module)   Transpile the library to ES Module

> When writing the ES Module library, you should include the extension `.js`​ when importing files. For example `import { rootDebug } from './utils.js'`​

To import ES Module libraries, your library should also be ES Module. See [@nrwl/node application not transpiling to esm · Issue #10296 · nrwl/nx](https://github.com/nrwl/nx/issues/10296) for more information.

In file `packages/cli/package.json`​:
add `"type": "module"`​.

In file `packages/cli/tsconfig.lib.json`​
Change the "module" value to `esnext`​.

In file  `tsconfig.base.json`​:
Change the "target" compiler value to `esnext`​.

## [   ](https://dev.to/eransakal/create-a-nodejs-command-line-library-with-nrwl-nx-workspace-5hin#create-the-initial-command-of-the-cli)   Create the initial command of the CLI

> Before continuing with the guide, this is a good time to commit your workspace to Github.

In the previous section, you created a workspace and prepared it to your commands. Now it is time to add the command.

The recommended structure for the library:

```
packages/cli/src                           (folder)
    ┣ index.ts
    ┣ cli.ts
    ┣ utils.ts
    ┗ {command-name}                       (folder)
        ┣ any-file-relevant-to-command.ts
        ┗ command.ts  
    ┗ {another-command-name}               (folder)
        ┗ command.ts  
```

In this article, we will create a command named `doSomething`​ that does nothing besides writing to the console.

### [   ](https://dev.to/eransakal/create-a-nodejs-command-line-library-with-nrwl-nx-workspace-5hin#install-recommended-libraries)   Install recommended libraries

Many excellent libraries can be used to provide a rich and friendly command-line user experience.

In this article, we will install a few mandatory libraries.

1. [commander - npm](https://www.npmjs.com/package/commander) - Required. A library that lets you define the commands and their arguments, options, help, etc.
2. [debug - npm](https://www.npmjs.com/package/debug) - Required. A popular library to write debug logs.
3. [fast-glob - npm](https://www.npmjs.com/package/fast-glob) - Recommended. A high-speed and efficient glob library.
4. [inquirer - npm](https://www.npmjs.com/package/inquirer) - Recommended. A collection of common interactive command line user interfaces.

Install the required libraries (feel free to add a few more).

```
npm i commander debug
```

### [   ](https://dev.to/eransakal/create-a-nodejs-command-line-library-with-nrwl-nx-workspace-5hin#remove-unused-files)   Remove unused files

in the project, delete the `packages/cli/src/lib`​ folder, which was added when you created the node package.

Clear the content from the `packages/cli/src/index.ts`​ file. Keep the file as you might need it later, but it can be empty at the moment.

### [   ](https://dev.to/eransakal/create-a-nodejs-command-line-library-with-nrwl-nx-workspace-5hin#add-the-initial-command-code)   Add the initial command code

#### [   ](https://dev.to/eransakal/create-a-nodejs-command-line-library-with-nrwl-nx-workspace-5hin#the-raw-srcutilsts-endraw-file)   The `src/utils.ts`​ file

Copy the following content into the utils file.

```
import Debug from 'debug';  

// TODO replace `obsidian-album` with a friendly short label that describe best your library  
export const rootDebug = Debug('obsidian-album')  

export const printVerboseHook = (thisCommand) => {  

  const options = thisCommand.opts();  

  if (options.verbose) {  
    Debug.enable('obsidian-album*');  
    rootDebug(`CLI arguments`);  
    rootDebug(options);  
  }  
}
```

#### [   ](https://dev.to/eransakal/create-a-nodejs-command-line-library-with-nrwl-nx-workspace-5hin#the-raw-srcdosomethingcommandts-endraw-file)   The `src/doSomething/command.ts`​ file

Please copy the following template and adjust it to your needs.

```
import * as fs from "fs";  
import { Command }  from 'commander';  
import { printVerboseHook, rootDebug } from '../utils.js';  
import * as process from "process";  

// TODO general: remember to name the folder of this file as the command name  
// TODO general: search all the occurrences of `doSomething` and replace with your command name  

const debug = rootDebug.extend('doSomething')  
const debugError = rootDebug.extend('doSomething:error')  

export const doSomethingCommand = () => {  
  const command = new Command('doSomething');  
  command  
    .argument('[path]', "directory to do something with")  
    .option('--verbose', 'output debug logs',false)  
    .option('--target <name>', 'the target name', 'aws')  
    // .requiredOption('--includeDirectories', 'copy directories')  
    .hook('preAction', printVerboseHook)  
    .action(async(path, options) => {  
      if (path && !fs.existsSync(path)) {  
        debugError('invalid path provided')  
        process.exit(1)  
      }  

      debug(`Something important is happening now....`)  
    });  
  return command;  
}
```

#### [   ](https://dev.to/eransakal/create-a-nodejs-command-line-library-with-nrwl-nx-workspace-5hin#the-raw-srcclits-endraw-file)   the `src/cli.ts`​ file

Create the file and add the following:

```
#! /usr/bin/env node  
import {Command} from 'commander';  
import {doSomethingCommand} from "./doSomething/command.js";  

const program = new Command();  
program  
  .name('Obsidian PDF album creator')  
  .description('Create printable styled PDF album from Obsidian')  

program.addCommand(doSomethingCommand());  

program.parse(process.argv);
```

## [   ](https://dev.to/eransakal/create-a-nodejs-command-line-library-with-nrwl-nx-workspace-5hin#test-the-command)   Test the command

Run the following command `npm run cli -- doSomething --verbose`​.

**Note!** the additional `--`​ after the `npm run cli`​ is used to signal NPM to send all the remaining arguments to the underline script, meaning our node CLI library.

```
> obsidian-album@1.0.0 cli
> node dist/packages/cli/src/cli doSomething --verbose

  obsidian-album CLI arguments +0ms
  obsidian-album { verbose: true, target: 'aws' } +1ms
  obsidian-album:doSomething Something important is happening now.... +0ms
```

### [   ](https://dev.to/eransakal/create-a-nodejs-command-line-library-with-nrwl-nx-workspace-5hin#test-the-command-2)   Test the command #2

You can test it in a way that resembles the deployed application's behavior.

Make sure you build your project.

In the terminal, navigate to `dist/packages/cli`​ and run the `npm link`​ command.

Once done, you can navigate back to the root folder.

Use npx to run the library. For example, `npx obsidian-album`​:

```
Usage: Obsidian PDF album creator [options] [command]

Create a printable styled PDF album from Obsidian

Options:
  -h, --help                    display help for command

Commands:
  doSomething [options] [path]
  help [command]                display help for command
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
