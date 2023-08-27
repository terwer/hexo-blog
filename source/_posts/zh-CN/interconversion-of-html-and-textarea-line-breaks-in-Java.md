---
title: Java中HTML与Textarea换行符的相互转换
date: '2022-04-25 17:03:13'
updated: '2023-08-27 19:31:27'
excerpt: >-
  这段代码实现了将 HTML 文本转换为 TextArea 文本，以及将 TextArea 文本转换回 HTML。具体而言，它定义了两个函数，一个用于将
  HTML 转换为 TextArea 文本，另一个用于将 TextArea 文本转换为 HTML。这些函数在处理换行符时使用了字符串替换操作。
tags:
  - java
  - code-snapshot
categories:
  - 技术分享
permalink: /post/interconversion-of-html-and-textarea-line-breaks-in-Java.html
comments: true
toc: true
---


HTML 与 Textarea 中换行符相互转化。

```java
/**
 * Html转换为TextArea文本
 *
 * @return
 */
public static String HtmlToText(String str) {
	if (str == null) {
		return "";
	} else if (str.length() == 0) {
		return "";
	}
	str = str.replaceAll("<br />", "\r\n");
	return str;
}

/**
 * TextArea文本转换为Html:写入数据库时使用
 */
public static String Text2Html(String str) {
	if (str == null) {
		return "";
	} else if (str.length() == 0) {
		return "";
	}
	str = str.replaceAll("\r\n", "<br />");
	return str;
}
```