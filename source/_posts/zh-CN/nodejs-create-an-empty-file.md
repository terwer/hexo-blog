---
title: NodeJS创建一个空文件
date: '2022-04-28 22:21:35'
updated: '2023-08-27 21:54:16'
excerpt: >-
  本文介绍了如何使用Node.js中的fsopensync函数创建一个空文件并返回文件描述符_varfd，然后直接创建新文件而无需返回值，最后使用fsclosesync函数关闭文件。
tags:
  - node
  - nodejs
  - file
  - 创建文件
  - 空文件
  - 文件操作
categories:
  - 技术分享
  - nodejs
permalink: /post/nodejs-create-an-empty-file.html
comments: true
toc: true
---


创建一个空文件并返回：

```javascript
var fd = fs.openSync(filepath, 'w');
```

直接创建新文件不用返回值

```javascript
fs.closeSync(fs.openSync(filepath, 'w'));
```