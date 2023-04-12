---
title: 自定义类加载器与JVM内置加载器交互详析
updated: 2022-07-10 21:42:32
excerpt: 自定义类加载器与JVM内置加载器交互详析
tags:
  - jvm
  - classloader
  - interact
  - custom
categories:
  - JVM新思路
  - 新笔记
permalink: /post/detailed-analysis-of-the-interactive-analysis-of-the-custom-class-loader-and-the-jvm-built-in-loader.html
comments: true
toc: true
---
# 自定义类加载器与JVM内置加载器交互详析

## java 指定 class 路径

```bash
java -cp .;/myclasspath Test
```

## 定义类加载器

如果某个类加载器能够加载一个类，那么该类加载器称为：**定义类加载器**。

定义类加载器及其所有子类加载器称为：**初始类加载器**。

当生成一个自定义类加载器的实例时，如果没有指定它的父类加载器，那么系统类加载器就成为该类加载器的父加载器。