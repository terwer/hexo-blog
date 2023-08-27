---
title: Netty核心原理
date: '2022-04-18 22:14:15'
updated: '2023-08-27 17:44:33'
excerpt: >-
   Netty是基于事件驱动的异步网络应用程序框架，用于快速开发高性能、高可靠性的网络IO程序。它解决了原生NIO的繁琐和复杂性，简化了网络应用的开发过程。Netty的核心优势包括零拷贝、可扩展的事件模型、支持多种协议、安全传输、高性能和灵活的线程模型等。该框架在互联网、大数据、分布式计算、游戏和通信等领域广泛应用。
tags:
   - netty
   - nio
   - socket
   - 异步网络框架
   - 高性能
   - 事件驱动
   - NIO
categories:
   - 分布式
   - Netty
permalink: /post/netty-core-principles.html
comments: true
toc: true
---


Netty 提供异步的、基于事件驱动的网络应用程序框架，用于快速开发高性能、高可靠性的网络 IO 程序。

## netty 核心原理

### netty 介绍

官网：[https://netty.io/](https://netty.io/)

#### 原生 NIO 存在的问题

1. NIO 类库和 API 繁杂，使用麻烦。需要熟练掌握 Selector、ServerSocketChannel、SocketChannel、ByteBuffer 等。
2. 需要具备其他额外技能：要熟悉 Java 多线程编程，因为 NIO 涉及到 Reactor 模式，必须对多线程和网络编程非常熟悉，才能编写出高质量的 NIO 程序。
3. 开发工作量和难度非常大：例如客户端面临短线重连、网络闪断、半包读写、失败缓存、网络拥塞和异常流处理等。
4. JDK NIO 的 bug：臭名昭著的 Epoll BUG，它会导致 Selector 空轮询，最终导致 CPU100%。直到 JDK1.7 版本，该问题依然存在，没有被根本解决。

   > 在 NIO 中通过 Selector 轮询当前是否有 IO 事件。
   >
   > 根据 JDK NIO api 的描述，Selector 的 select()方法会一致阻塞，直到 IO 事件到达或者超时。但是在 Linux 平台上有时候会出现问题，在某些场景下 select 方法会直接返回，这就是臭名昭著的 Epoll Bug。
   >
   > 这是一比较严重的 Bug，它会导致线程陷入死循环，让 CPU 达到 100%，极大的影响系统的可靠性，到目前为止，JDK 还没有完全解决这个问题。

参考：[NIO 的 epoll 空轮询 bug](https://www.cnblogs.com/JAYIT/p/8241634.html)

#### 概述

Netty 是由 JBOSS 提供的一款开源框架。

Netty 提供异步的、基于事件驱动的网络应用程序框架，用于快速开发高性能、高可靠性的网络 IO 程序。

Netty 是一个基于 NIO 的网络编程框架，使用 NIO 可以快速、简单的开发出一个网络应用，极大的简化了 NIO 的开发过程。

作为当前最流行的 NIO 框架，Netty 在互联网领域、大数据分布式计算领域、游戏行业、通信行业，获得了广泛应用，知名的 Elasticsearch、Dubbo 等内部都采用了 Netty 框架。

​![image-20220419113521663](https://img1.terwer.space/image-20220419113521663.png)​

Netty 的强大之处：零拷贝、可扩展事件模型，支持 TCP、UDP、HTTP、WebSocket 等协议，提供安全传输、压缩、大文件传输、编解码等。

Netty 有以下优点：

1. 设计优雅，提供阻塞和非阻塞 Socket，提供灵活可扩展的事件模型，提供高度可定制的线程模型。
2. 具备更高的性能和更大的吞吐量，使用零拷贝技术最小化不必要的内存复制，减少资源的消耗。
3. 提供安全传输特性。
4. 支持多种主流协议，预置多种编解码功能，支持用户开发私有协议。