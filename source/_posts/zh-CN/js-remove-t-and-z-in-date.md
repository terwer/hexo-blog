---
title: JS去除日期date格式化中的T和Z
date: &id001 2022-06-15 02:18:51
updated: *id001
excerpt: 在JS中，创建的时间有时候会默认带有T和Z，不利于显示，可以使用这个方法去除。
tags:
  - js
  - date
  - format
categories:
  - 经验分享
  - 实用技巧
permalink: /post/js-remove-t-and-z-in-date.html
comments: true
toc: true
---
# JS去除日期date格式化中的T和Z

代码如下

```javascript
const formatDate = (dt) => {
  if (!dt) {
    return "";
  }
  let newdt = dt.replace(/T/g, ' ')
  return newdt.substr(0, newdt.lastIndexOf('.'));
}
```