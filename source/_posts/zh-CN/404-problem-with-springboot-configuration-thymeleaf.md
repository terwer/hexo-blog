---
title: 关于Springboot配置thymeleaf的404问题
date: '2022-04-30 23:42:57'
updated: '2023-08-27 22:32:09'
excerpt: >-
  本文描述了一个关于 YAML 配置和 Spring Boot 的问题。问题出在 Spring Boot 项目的包结构上，导致自动扫描无法注册
  controller 类，从而无法访问。通过将 controller 包移动到与 application 类同一包的子包下，问题得以解决。
tags:
  - error
  - '404'
  - springboot
  - thymeleaf
categories:
  - 技术分享
  - Spring Boot
permalink: /post/404-problem-with-springboot-configuration-thymeleaf.html
comments: true
toc: true
---


## 问题

我的 yaml 配置

```
server:
  port: 8080
resources:
  static-locations:
    - classpath:/static/
spring:
  thymeleaf:
    cache: false
    checktemplatelocation: true
    enabled: true
    encoding: UTF-8
    mode: HTML
    prefix: classpath:/templates/
    suffix: .html
```

controller 目录结构

​![image-20220430234546959](https://img1.terwer.space/image-20220430234546959.png)​

## 原因

其实是一个非常简单的错误，找了半天。

我么默认创建的 Springboot 项目 Application 启动入口类目录是在项目包下面的。**如果我们创建的 controller 不是项目包的子包的话，那么自动扫描就不会扫码 controller 类，从而导致 conroller 无法注册，访问肯定就 404 了。**

## 解决

调整 controller 包的位置，使它位于 Application 所在包的子包下面即可。

​![image-20220430235031452](https://img1.terwer.space/image-20220430235031452.png)​

这样问题就解决了。