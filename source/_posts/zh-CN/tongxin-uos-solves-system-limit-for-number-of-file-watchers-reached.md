---
title: 统信 UOS 解决 System limit for number of file watchers reached
date: '2022-06-08 01:08:53'
updated: '2022-06-08 01:08:53'
excerpt: 原因：文件监视程序的系统产生了限制，达到了默认的上限，需要增加限额。
tags:
  - uos
  - uos-home
  - deepin
  - vue
  - vuepress
categories:
  - 统信UOS专区
  - UOS专区
permalink: /post/tongxin-uos-solves-system-limit-for-number-of-file-watchers-reached.html
comments: true
toc: true
---
## 问题背景
系统：统信 UOS

详情：启动 vuepress 项目，报错

```bash
Error: ENOSPC: System limit for number of file watchers reached, watch '/home/terwer/mydocs/src.terwer.github.io/docs'
```

## 解决办法
原因：文件监视程序的系统产生了限制，达到了默认的上限，需要增加限额。

查看

```bash
cat /proc/sys/fs/inotify/max_user_watches
```

临时增加限额

```bash
sudo sysctl fs.inotify.max_user_watches=524288 
sudo sysctl -p
```

永久增加限额

```bash
echo fs.inotify.max_user_watches = 524288 | sudo tee -a /etc/sysctl.conf 
sudo sysctl -p
```