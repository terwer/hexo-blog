---
title: pnpm安装electron报错404解决方案
date: '2022-07-12 13:27:11'
updated: '2022-07-12 13:27:11'
excerpt: 自定义镜像地址和版本解决pnpmconfigsetregistryhttps_registrynpmmirrorcompnpmconfigsetelectron_mirror=https_cdnnpmmirrorcombinarieselectronpnpmconfigsetelectron_custom_dir=参考_https_githubcomelectronelectronissues‍
tags:
  - pnpm
  - npm
  - node
  - js
  - '404'
  - electron
categories:
  - 经验分享
permalink: /post/pnpm-installation-electron-error-404-solution-z2tty08.html
comments: true
toc: true
---
自定义镜像地址和版本解决

```bash
pnpm config set registry https://registry.npmmirror.com/

pnpm config set electron_mirror=https://cdn.npmmirror.com/binaries/electron/ 
pnpm config set electron_custom_dir=14.2.5
```

参考：

[https://github.com/electron/electron/issues/22792](https://github.com/electron/electron/issues/22792)

‍