---
title: Hexo平台配置指南
date: '2023-09-08 18:21:40'
updated: '2025-04-14 18:17:23'
permalink: /post/hexo-platform-configuration-z-sbwqt.html
comments: true
toc: true
---



## 官网

[https://hexo.io/zh-cn/](https://hexo.io/zh-cn/)

## 准备工作

```bash
npm install hexo-cli -g
hexo init hexo-blog
cd blog
npm install
hexo server
```

## Hexo 的 Front-matter

[Front-matter | Hexo](https://hexo.io/zh-cn/docs/front-matter)

我开发此功能的测试博客：[https://hexo.terwer.space](https://hexo.terwer.space) 或者 [https://terwer.space](https://terwer.space)

源码：[https://github.com/terwer/hexo-blog](https://github.com/terwer/hexo-blog)

## 发布指南

### 基本设置

#### 平台导入

1. 导入 Hexo 平台（如果是使用 Gitlab，Gitlab 需要自己部署，需要导入 Gitlabhexo，其他的类似，教程以 Github 为例）

    点击发布工具图标：

    ​![image](assets/image-20250414094513-9qsnouw.png)​

    依次选择 **通用设置** -> **发布设置。**

    ​![image](assets/image-20250414094622-c31sxe1.png)​

    在弹出的对话框中依次点击 **插件商店** -> **Github** -> **Hexo**，在弹出的抽屉里面点击 **启用**，然后 **提交：**

    ​![image](assets/image-20250414095404-q7vbqe4.png)​

    <span data-type="text" style="color: var(--b3-font-color9);">注意：如果这是首次添加。因为目前支持多个实例，如果是第二次添加可自定义设置名称。</span>

    然后关闭弹窗。重新点击 **通用设置** -> **发布设置**，在列表中可以看到刚刚新加的平台。

    注意：强烈建议重新打开，避免配置未同步的可能。
2. 点击 **通用设置** -> **发布设置，** 找到新增的 Hexo 平台。

    ​![image](assets/image-20250414095757-pn43kpn.png)​
3. 设置最小可用配置

    点击 **设置** 进入平台设置界面。一般情况下，下列段是必须的。其他的配置可酌情修改。

    配置1

    ​![image](assets/image-20250414100453-fgp9gyq.png)​

    配置2

    ​![image](assets/image-20250414101006-garg4gx.png)​

    配置3-更多配置（可选）

    ​![image](assets/image-20250414101239-c31lnrf.png)​
4. 正确配置之后显示如下：

    ​![image](assets/image-20250414101356-qlqafjx.png)​
5. 开始发布，直接 **一键发布** -> **hexo** 即可。

    ​![image](assets/image-20250414101700-wg2gx84.png)​
6. 常规发布，支持更多个性化设置，点击 **常规发布** -> **Hexo**，然后进去个性化设置之后发布即可。

    ​![image](assets/image-20250414101554-yy4kg5z.png)​
7. 删除或者解除关联

    ‍

### 高级个性化设置

#### 发布目录

#### 文件规则

#### YAML 预设

#### 预览规则
