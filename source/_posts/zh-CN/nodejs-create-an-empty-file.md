---
title: NodeJS创建一个空文件
updated: 2022-04-28 21:32:35
tags:
  - node
  - nodejs
  - file
categories:
  - 经验分享
  - 实用技巧
permalink: /post/nodejs-create-an-empty-file.html
comments: true
toc: true
---
# NodeJS创建一个空文件

创建一个空文件并返回：

```javascript
var fd = fs.openSync(filepath, 'w');
```

直接创建新文件不用返回值

```javascript
fs.closeSync(fs.openSync(filepath, 'w'));
```