---
title: openEuler2203移除旧的lernel
date: &id001 2022-05-27 11:11:01
updated: *id001
excerpt: openEuler2203移除旧的kernel。
tags:
  - euler
  - open-euler
categories:
  - 开发流程
  - 过程改进
  - 开发效率
permalink: /post/open-euler-remove-old-kernel.html
comments: true
toc: true
---
方法如下：

```bash
dnf remove --oldinstallonly --setopt installonly_limit=2 kernel
```