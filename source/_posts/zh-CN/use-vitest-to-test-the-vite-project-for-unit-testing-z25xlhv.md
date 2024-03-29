---
title: 使用vitest对vite项目进行单元测试
date: '2022-08-18 16:32:13'
updated: '2022-08-18 16:32:13'
excerpt: 使用vitest对vite项目进行单元测试缘由开发阶段经常需要测试一段代码正确性每次都去启动服务器验证实际上是不明智的。之前我一直采用单文件测试但是后来越来越发现这种弊端对于简单逻辑尚可一旦需要各种依赖时候就会出现单文件的环境与实际项目差别太大问题。解决那么解决方案就是我们今天要学习的vitest单元测试框架_专门为vite项目量身定制。上手先安装yarnadddvitest
tags:
  - 项目
  - 单元测试
  - 需要
  - 测试
  - 文件
categories:
  - 前端开发
permalink: /post/use-vitest-to-test-the-vite-project-for-unit-testing-z25xlhv.html
comments: true
toc: true
---
# 使用vitest对vite项目进行单元测试



## 缘由

开发阶段经常需要测试一段代码的正确性，每次都去启动服务器验证实际上是不明智的。

之前我一直采用单文件测试，但是后来越来越发现这种弊端，对于简单逻辑尚可，一旦需要各种依赖时候，就会出现单文件的环境与实际项目差别太大问题。

## 解决

那么，解决方案就是我们今天要学习的 `vitest` 单元测试框架：专门为 vite 项目量身定制。

## 上手

先安装

```ts
yarn add -D vitest
```