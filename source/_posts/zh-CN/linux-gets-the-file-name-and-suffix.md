---
title: Linux获取文件名以及后缀名
date: '2022-05-11 23:50:25'
updated: '2022-05-11 23:50:25'
excerpt: Linux获取文件名以及后缀名。
tags:
  - linux
  - file
  - ext
categories:
  - 经验分享
  - 实用技巧
permalink: /post/linux-gets-the-file-name-and-suffix.html
comments: true
toc: true
---
:::tip 文章更新历史

2022/05/11 feat:初稿。

:::

在 Linux 中，利用 bash 获取文件名和后缀还是很常见的。

## 获取后缀名

```bash
ext = ${file: -4}
echo $ext
```

如果文件名是 `file.zip`，运行结果如下：

```bash
.zip
```

## 获取文件名

```bash
name = $(basename "$file" .zip)
echo $name
```

如果文件名是 `file.zip`，运行结果如下：

```bash
file
```