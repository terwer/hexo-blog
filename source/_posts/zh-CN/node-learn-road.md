---
title: Node宏观介绍与应用场景分析
updated: 2022-05-05 20:12:25
excerpt: Node的学习路线
tags:
  - node
  - js
categories:
  - Node新思路
  - 新笔记
permalink: /post/node-learn-road.html
comments: true
toc: true
---
## Node的起源

NodeJS最开始基于Google的v8引擎，后来逐渐发展为NodeJS。

V8：[https://v8.dev/](https://v8.dev/)

NodeJS依托于JavaScript，并且解决了js的很多设计缺陷。

## Node的特点

NodeJS底层采用了异步非阻塞的架构，Reactor编程模型。

NodeJS是单线程的，但是性能很好。

## 问题

callback地狱

解决：Promise

## 包管理工具

npm