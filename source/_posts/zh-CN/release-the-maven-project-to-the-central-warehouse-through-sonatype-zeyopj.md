---
title: 通过Sonatype发布Maven项目到中央仓库
date: '2022-04-27 14:33:35'
updated: '2023-08-27 21:33:55'
excerpt: >-
  本文介绍了将开源库发布到 Maven 中央仓库的方法。通过 Sonatype 将项目发布到中央仓库，而实际上是发布到
  central.sonatype.org，它会同步到 Maven 中央仓库。使用 Nexus 管理 Maven 仓库，注册 Sonatype
  账号并经过审核后，按照指引操作即可成功发布自己的 artifact 到 Nexus 上，最终会出现在 Maven 中央仓库中。
tags:
  - sonatype
  - maven
  - central
categories:
  - 技术分享
  - 工具使用
permalink: >-
  /post/release-the-maven-project-to-the-central-warehouse-through-sonatype-zeyopj.html
comments: true
toc: true
---


能不能把自己的开源库发布到 Maven 的中央仓库，这样用户就不需要声明 repo 地址，可以直接引用呢？答案是可以，这就是本文要解决的问题。

# 通过 Sonatype 发布 Maven 项目到中央仓库

## 缘由

开头说了我们想发布 maven 项目到中央仓库。但是问题来了，我们不能直接发布到 Maven 中央仓库，而是通过曲线救国的方式，发布到 [central.sonatype.org](http://central.sonatype.org) ，它会定期自动同步到 Maven 的中央仓库。

[Nexus](https://www.sonatype.com/nexus-repository-oss) 是一个支持 Maven 仓库的软件，由 Sonatype 开发，有免费版和专业版两个版本，很多大公司内部都使用 Nexus 作为自己的私有 Maven 仓库，而这个 [central.sonatype.org](https://central.sonatype.org/) 相当于面向开源的一个 Nexus 公共服务。

## 注册 sonatype 账号

第一步是在 [central.sonatype.org](https://central.sonatype.org/) 上注册一个账号，注册链接非常隐蔽，可以自己先找找，找半小时没找到点 [这里](https://issues.sonatype.org/secure/Signup!default.jspa) 查看。

如果注册顺利并审核通过，会得到一个登录账号，然后，通过 [这个页面](https://central.sonatype.org/pages/apache-maven.html) 一步一步操作就可以成功地将自己的 Artifact 发布到 Nexus 上，再耐心等待几个小时后，你的 Artifact 就会出现在 Maven 的中央仓库中。

## 参考

[https://zhuanlan.zhihu.com/p/141676033](https://zhuanlan.zhihu.com/p/141676033)