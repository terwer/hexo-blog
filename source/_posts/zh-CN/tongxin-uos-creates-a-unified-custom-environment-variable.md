---
title: 统信 UOS 创建统一的自定义环境变量
updated: 2022-06-08 00:03:30
excerpt: 统信 UOS 创建统一的自定义环境变量。
tags:
  - uos
  - uos-home
  - deepin
  - env
categories:
  - UOS专区
  - 统信UOS专区
permalink: /post/tongxin-uos-creates-a-unified-custom-environment-variable.html
comments: true
toc: true
---
# 统信 UOS 创建统一的自定义环境变量

## 创建配置文件

```bash
touch ~/my_profile.sh
echo 'echo "my profile inited"' >> ~/my_profile.sh
```

## 添加配置文件到 shell 环境

例如：zsh 配置文件如下

```bash
vim ~/.zshrc
```

加上如下配置：

```bash
# User configuration

source ~/my_profile.sh
```

这样一来，我们以后只需要配置`~/my_prifle.sh`这个文件即可。无需再修改`.zshrc`文件，非常优雅。

使配置立即生效

```bash
source ~/.zshrc
```

如下

```bash
➜  ~ source ~/.zshrc
my profile inited
➜  ~ 
```