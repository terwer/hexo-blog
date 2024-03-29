---
title: 线程模型以及传统IO阻塞模型
date: '2022-05-04 15:23:26'
updated: '2022-05-04 15:23:26'
excerpt: 不同的线程模型对性能影响很大，目前存在的线程模型有传统阻塞I/O服务模型、Reactor模型等。
tags:
  - io
categories:
  - 分布式
  - 后端开发
permalink: /post/thread-model-and-traditional-io-blocking-model.html
comments: true
toc: true
---
### 线程模型

#### 线程模型基本介绍

不同的线程模型对性能影响很大，目前存在的线程模型有：

- 传统阻塞I/O服务模型

- Reactor模型

  根据Reactor的数量和处理资源池线程的数量不同，可以分为3种

  - 单Reactor单线程
  - 单Reactor多线程
  - 多Reactor多线程

#### 传统阻塞I/O服务模型

采用阻塞I/O模式获取输入的数据，每个连接都需要独立的线程完成数据的输入，业务处理和数据返回工作。

![image-20220419161322076](https://img1.terwer.space/image-20220419161322076.png)

存在的问题：

1. 当并发数很大时，会创建大量线程，占用系统资源。
2. 连接创建后，如果当前线程没有数据可读，该线程会阻塞在read操作，造成线程资源浪费