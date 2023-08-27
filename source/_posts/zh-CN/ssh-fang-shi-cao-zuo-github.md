---
title: 使用SSH方式操作GitHub
date: '2022-04-17 10:27:12'
updated: '2023-08-27 17:07:12'
excerpt: >-
  本文介绍了在使用SSH密钥连接GitHub的过程。首先使用ssh-keygen生成密钥，然后将公钥添加到GitHub账户。详细步骤包括生成密钥、复制公钥内容、在GitHub设置中添加新SSH密钥并提交。完成后即可通过SSH方式操作GitHub。
tags:
  - ssh
  - github
categories:
  - 技术分享
  - 工具使用
permalink: /post/ssh-fang-shi-cao-zuo-github.html
comments: true
toc: true
---


# 生成 SSH key

```bash
ssh-keygen -t ed25519 -C "youweics@163.com"
```

# 拷贝 SSH key

```bash
vim ~/.ssh/id_ed25519.pub
```

直接拷贝秘钥字符串

然后打开 GitHub，Settings-> SSH and GPG keys，点击 New SSH key

​![image-20220417103459842](https://img1.terwer.space/image-20220417103459842.png)​

然后对包起个秘钥名字，把秘钥字符串粘贴到秘钥框内，点击 Add SSH key 提交即可。

​![image-20220417103641656](https://img1.terwer.space/image-20220417103641656.png)​

接下来就能用 SSH 的方式操作 GitHub 了。