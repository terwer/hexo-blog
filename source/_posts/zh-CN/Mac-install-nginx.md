---
title: Mac安装Nginx
date: '2022-04-29 16:48:36'
updated: '2023-08-27 22:24:07'
excerpt: >-
  本文介绍了通过Homebrew安装Nginx的过程。安装完成后，Nginx的默认文档根目录为/usr/local/var/www，默认端口设置为80。Nginx可以通过brew
  services启动，并可以使用usr/local/opt/nginx/bin/nginx -g 'daemon
  off;'命令非后台启动。停止Nginx可使用brew services stop nginx命令。
tags:
  - mac
  - nginx
categories:
  - 技术分享
  - Nginx
permalink: /post/Mac-install-nginx.html
comments: true
toc: true
---


## 安装

```bash
brew install nginx
```

结果如下：

```bash
==> Installing nginx
==> Pouring nginx--1.21.6.monterey.bottle.tar.gz
==> Caveats
Docroot is: /usr/local/var/www

The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
nginx can run without sudo.

nginx will load all files in /usr/local/etc/nginx/servers/.

To restart nginx after an upgrade:
  brew services restart nginx
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/nginx/bin/nginx -g daemon off;
==> Summary
🍺  /usr/local/Cellar/nginx/1.21.6: 26 files, 2.2MB
==> Running `brew cleanup nginx`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
==> Caveats
==> nginx
Docroot is: /usr/local/var/www

The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
nginx can run without sudo.

nginx will load all files in /usr/local/etc/nginx/servers/.

To restart nginx after an upgrade:
  brew services restart nginx
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/nginx/bin/nginx -g daemon off;
➜  ~
```

## 配置信息

文档根目录

```
/usr/local/var/www
```

默认配置文件：

```
/usr/local/etc/nginx/nginx.conf
```

默认端口设置成了 `8080`​ ，这样是为了不用 sudo 来启动

nginx 的安装路径：

```
/usr/local/Cellar/nginx/1.21.6**
```

### 启动 Nginx

```bash
brew services start nginx
```

### 重启 Nginx

```bash
brew services restart nginx
```

### 非后台启动

```bash
/usr/local/opt/nginx/bin/nginx -g daemon off
```

### 停止 Nginx

```bash
brew services stop nginx
```