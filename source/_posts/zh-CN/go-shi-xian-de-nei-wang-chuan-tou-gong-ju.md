---
title: 介绍一个Go实现的内网穿透神器frp
date: '2022-04-17 12:12:02'
updated: '2023-08-27 17:33:22'
excerpt: >-
  本文介绍了内网穿透的用途，特别是在需要外网访问的服务测试和共享接口测试方面的便利。作者推荐了使用frp工具进行内网穿透的方法，包括服务端和客户端的配置步骤。通过简单的配置，可以实现通过域名访问本地的HTTP服务，同时添加新服务只需新增域名解析和客户端配置。
tags:
  - proxy
  - network
  - go
  - 内网穿透
  - 域名解析
  - frp工具
  - 网络调试
categories:
  - 技术分享
  - 工具使用
permalink: /post/go-shi-xian-de-nei-wang-chuan-tou-gong-ju.html
comments: true
toc: true
---


内网穿透在某个必须外网访问才能测试的服务时候非常有用。还有，有时候，我们想把写好的接口给别人调用测试，但是又不想部署到云端，就可以直接本次启动，然后配置内网穿透，非常方便。

# 下载

废话不多说，直接开干。

[https://github.com/fatedier/frp/releases/download/v0.41.0/frp_0.41.0_darwin_amd64.tar.gz](https://github.com/fatedier/frp/releases/download/v0.41.0/frp_0.41.0_darwin_amd64.tar.gz)

这个直接下载解压即可，没什么好说的。

## 服务端配置

```properties
# frps.ini
[common]
bind_port = 7000
vhost_http_port = 80
```

## 客户端配置

```properties
# frpc.ini
[common]
server_addr = x.x.x.x
server_port = 7000

[web]
type = http
local_port = 80
custom_domains = www.example.com
```

## 添加域名

添加一条 A 记录，域名为 www.example.com ，ip 指向服务器的 ip。

# 测试

现在你就能使用 www.example.com 访问本地 http://localhost 的 http 服务了。

如果我们新增了一个，只需要添加一条域名解析到服务器所在 ip，然后修改客户端配置即可。

例如 **新增 test.example.com 访问本地的 3000 端口的 http 服务**,那么域名添加 A 记录到服务器 ip，然后客户端配置加上一句话即可。

```properties
[web]
type = http
local_port = 3000
custom_domains = test.example.com
```

这么简单优雅，简直不要太爽！

# 延伸阅读

[nginx 配置多个域名使用同一个端口](https://www.csdn.net/tags/MtjaYgzsNTYzNjAtYmxvZwO0O0OO0O0O.html)

[frp+nginx 内网穿透](https://blog.csdn.net/qq_37499645/article/details/114535942)