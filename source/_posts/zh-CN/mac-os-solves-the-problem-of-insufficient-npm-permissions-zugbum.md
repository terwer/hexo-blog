---
title: MacOS解决npm权限不足问题
updated: 2022-08-24 18:01:34
excerpt: sudochownr`whoami`~npmsudochownr`whoami`usrlocallibnode_modules错误提示如下_permissiondeniedaccessusrlocallibnode_modules‍
tags:
  - 错误
  - 提示
  - npm
  - permission
  - deny
categories:
  - 前端开发
permalink: /post/mac-os-solves-the-problem-of-insufficient-npm-permissions-zugbum.html
comments: true
toc: true
---
```bash
sudo chown -R `whoami` ~/.npm
sudo chown -R `whoami` /usr/local/lib/node_modules
```

错误提示如下：

```bash
permission denied, access '/usr/local/lib/node_modules/'
```

‍