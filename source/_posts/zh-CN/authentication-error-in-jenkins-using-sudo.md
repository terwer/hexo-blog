---
title: 解决jenkins使用sodo出现的Authentication error in jenkins on using sudo错误
date: '2022-04-28 21:38:15'
updated: '2023-08-27 21:59:58'
excerpt: >-
  文章讨论了在运行Jenkins时允许无密码使用sudo的配置。通过修改sudoers文件，将jenkins用户添加到sudo组并赋予nopasswd权限，实现了Jenkins在执行特定任务时无需密码进行sudo操作。
tags:
  - jenkisn
  - sudo
  - auth
  - error
categories:
  - 技术分享
  - Jenkins
permalink: /post/authentication-error-in-jenkins-using-sudo.html
comments: true
toc: true
---


修改 suduousers

```bash
sudo su  
visudo -f /etc/sudoers
```

运行 jenkins 无密码使用 sudo

```bash
jenkins ALL= NOPASSWD: ALL
```
