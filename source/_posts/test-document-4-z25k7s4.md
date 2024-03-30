---
title: 003.测试文档9
date: '2023-08-15 22:58:53'
updated: '2024-03-30 12:52:07'
excerpt: >-
  本文包括单元测试和翻译成中文两个案例。第一个案例涉及 Rust 的 wasm
  单元测试，覆盖各种场景和边界。第二个案例要求将一段内容翻译成中文，保持格式不变。
tags:
  - 开发
  - 单元测试
  - 文档
  - 测试图片
categories:
  - 测试分类
permalink: /post/test-document-4-z25k7s4.html
comments: true
toc: true
---

# 003.测试文档9

‍

可以自己构造请求体[表情]

‍

然后用 base64 编码自己构造的请求体

‍

用 Request 构造一个请求，然后调用它的 arrayBuffer 方法获取请求体，之后编码即可  
https://developer.mozilla.org/zh-CN/docs/Web/API/Request

‍

```js
 // payload
  let payloadBuf = new ArrayBuffer(0)
  // GET or HEAD cannot have request body
  if (options.method !== "GET" && options.method !== "HEAD") {
    const myRequest = new Request("", { method: options.method, body: options.data })
    payloadBuf = await myRequest.arrayBuffer()
  }
  const payload = CodingUtil.encodeToBase64String(payloadBuf)
```

‍

```js

import { Buffer } from "./nodePolyfill"

/**
 * 提供编码和解码相关的实用方法
 *
 * @author terwer
 * @since 1.8.0
 */
class CodingUtil {
  /**
   * 编码字符串为 base64 格式
   *
   * @returns 编码后的 base64 字符串
   * @param input -  string | Uint8Array | ArrayBuffer
   */
  public static encodeToBase64String(input: any): string {
    const buffer = Buffer.from(input)
    return buffer.toString("base64")
  }

  /**
   * 解码 base64
   *
   * @returns 解码后的值
   * @param input - 要解码的 base64 字符串
   */
  public static decodeBase64(input: string): Buffer {
    return Buffer.from(input, "base64")
  }

  /**
   * 编码字符串为十六进制格式
   *
   * @param input 要编码的字符串
   * @returns 编码后的十六进制字符串
   */
  public static encodeToHexString(input: string): string {
    const buffer = Buffer.from(input)
    return buffer.toString("hex")
  }

  /**
   * 解码十六进制
   *
   * @param input 要解码的十六进制字符串
   * @returns 解码后的值
   */
  public static decodeHex(input: string): Buffer {
    return Buffer.from(input, "hex")
  }
}

export { CodingUtil }
```

​![image](http://onu1xvsy0.bkt.clouddn.com/test/20240330091641..png)​

‍

​![image](https://img1.terwer.space/api/public/image-20240330120442-gtvn48v.png)​
