---
title: css背景上下渐变的实现
date: '2022-07-09 15:37:00'
updated: '2022-07-09 15:37:00'
excerpt: css背景上下渐变的实现backgroundwebkitlineargradienttop#eefaef#ffffff/*关于渐变色的兼容*/backgroundmslineargradienttop#eefaef#ffffff/*ie10*/backgroundmozlineargradienttop#eefaef#ffffff/*火狐*/backgroundwebkitgradientlinear0%0%0%100%from#eefaefto#ffffff/*safari45chrome19*/bac
tags:
  - css
  - background
categories:
  - 前端开发
permalink: /post/css-background-gradient-implementation.html
comments: true
toc: true
---
# CSS背景上下渐变的实现

```css
background: -webkit-linear-gradient(top, #eefaef, #ffffff);
/* 关于渐变色的兼容 */
background: -ms-linear-gradient(top, #eefaef, #ffffff); /* IE 10 */
background: -moz-linear-gradient(top, #eefaef, #ffffff); /*火狐*/
background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#eefaef), to(#ffffff)); /* Safari 4-5, Chrome 1-9*/
background: -o-linear-gradient(top, #eefaef, #ffffff); /*Opera 11.10+*/
```