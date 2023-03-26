---
title: 世界，你好！
date: 2011-09-11 01:57:58
excerpt: >-
  这是一篇示例文章，介绍了各种特性的使用方法说明，例如：代码块、选项卡、消息提示等。
permalink: /post/hello-world.html
tags: hello-world
comments: true
toc: true
sticky: true
---

## 代码高亮

https://ppoffice.github.io/hexo-theme-icarus/Configuration/icarus%E7%94%A8%E6%88%B7%E6%8C%87%E5%8D%97-%E4%B8%BB%E9%A2%98%E9%85%8D%E7%BD%AE/#%E4%BB%A3%E7%A0%81%E9%AB%98%E4%BA%AE

{% codeblock lang:java %}
public static void main(){
    System.out.println("Hello, Worlds!");
}
{% endcodeblock %}

## 代码选项卡

https://ppoffice.github.io/hexo-theme-icarus/uncategorized/custom-hexo-tag-helpers/#Tabs

<div class="example-tab-container">
{% tabs style:toggle-rounded %}
<!-- tab id:tab11 "icon:fa fa-brands fa-java" title:Java active -->
{% codeblock lang:java %}
public static void main(){
    System.out.println("Hello, Worlds!");
}
{% endcodeblock %}
<!-- endtab -->
<!-- tab id:tab12 "icon:fa-brands fa-swift" title:Kotlin -->
{% codeblock lang:kotlin %}
func main(){
    print("Hello, Worlds!")
}
{% endcodeblock %}
<!-- endtab -->
...
{% endtabs %}
</div>

<div class="example-tab-container">
{% tabs style:boxed %}
<!-- tab id:tab_boxed_icon_1 "icon:fa-brands fa-github" "title:GitHub" active -->
这个标签页的图标(`icon`)为`"icon:fa-brands fa-github"`。
<!-- endtab -->
<!-- tab id:tab_boxed_icon_2 "icon:fa-brands fa-node-js" "title:Node.js" -->
这个标签页的图标(`icon`)为`"icon:fa-brands fa-node-js"`。
<!-- endtab -->
{% endtabs %}
</div>

## 消息提示

https://ppoffice.github.io/hexo-theme-icarus/uncategorized/%E8%87%AA%E5%AE%9A%E4%B9%89hexo%E6%A0%87%E7%AD%BE%E6%8F%92%E4%BB%B6/#%E6%B6%88%E6%81%AF

{% message color:primary title:温馨提示 %}
这是一个提示信息
{% endmessage %}

## 文章语言

在 front formatter 写上 `language: zh-CN` 可支持中文文章。

## 文章置顶

在 front formatter 写上 `sticky: true` 即可将文章置顶。

## 首页隐藏文章

https://github.com/prinsss/hexo-hide-posts/blob/master/README_ZH.md

在 front formatter 写上 `hidden: true` 即可将文章在首页隐藏，但是该文章仍然可以通过永久链接访问。


<article class="message message-immersive is-warning">
<div class="message-body">
<i class="fas fa-question-circle mr-2"></i>文章内容有误？点击<a href="https://github.com/terwer/hexo-blog/edit/main/source/_posts/zh-CN/hello-world.md">此处</a>提交修改。
</div>
</article>