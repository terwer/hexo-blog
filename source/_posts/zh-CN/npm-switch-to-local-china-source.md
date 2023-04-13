---
title: npm切换为阿里云国内源码
date: &id001 2022-07-11 03:07:00
updated: *id001
excerpt: npm切换为阿里云国内源码npmnpmconfigsetregistryhttps//registrynpmmirrorcom/pnpmnpminstallgpnpmpnpmconfigsetregistryhttps//registrynpmmirrorcom/pnpmconfigsetelectron_mirrorhttps//npmmirrorcom/mirrors/electron/yarnnpminstallgyarn
tags:
  - npm
  - pnpm
  - yarn
categories:
  - 前端开发
permalink: /post/npm-switch-to-local-china-source.html
comments: true
toc: true
---
# npm切换为阿里云国内源码

## npm

```bash
npm config set registry https://registry.npmmirror.com/
```

## pnpm

```bash
npm install -g pnpm
pnpm config set registry https://registry.npmmirror.com/
pnpm config set electron_mirror https://npmmirror.com/mirrors/electron/
```

## yarn

```bash
npm install -g yarn
```