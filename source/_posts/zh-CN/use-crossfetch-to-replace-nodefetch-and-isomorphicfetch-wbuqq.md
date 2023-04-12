---
title: 使用cross-fetch替换node-fetch和isomorphic-fetch
updated: 2022-08-20 22:48:47
excerpt: 安装yarnaddcrossfetch使用importfetchfromcrossfetch_polyfill的使用方式importcrossfetchpolyfill_
tags:
  - 使用
  - 安装
  - 方式
  - cross
  - fetch
  - ponyfill
  - polyfill
  - y
  - a
categories:
  - 前端开发
permalink: /post/use-crossfetch-to-replace-nodefetch-and-isomorphicfetch-wbuqq.html
comments: true
toc: true
---
安装

```ts
yarn add cross-fetch
```

使用

```ts
import fetch from 'cross-fetch';
```

polyfill的使用方式

```ts
import 'cross-fetch/polyfill';
```