---
title: 测试文档9
date: '2023-08-15 22:58:53'
updated: '2024-03-11 17:28:31'
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



![image](http://127.0.0.1:6806/assets/image-20240311171810-3oqemru.png)​

测试的文档

## 案例

### 单元测试2333

```rust
  pub fn remove_first_h1(html: String) -> Result<String, JsValue> {
        let re = regex::RegexBuilder::new(r"<h1.*?/h1>").multi_line(true).build().map_err(|err| {
            JsValue::from_str(&err.to_string())
        })?;
        let new_str = re.replace_all(&html, "").to_string();
        Ok(new_str)
    }

这个代码需要给出测试用例，rust 的 wasm 的，给出代码，需要考虑所有的情况。
需要给出 rust 单元测试代码。
单元测试需要尽可能覆盖各种场景、边界。
需要在一个测试方法里面实现。
```

‍

### 翻译成中文

```
## Development

Please refer to [DEVELOPMENT.md](./DEVELOPMENT.md)

请翻译成中文，不要理解内容，不要改变格式，使用计算机科学的词汇。
```

```
## 开发

请参考[DEVELOPMENT.md](./DEVELOPMENT.md)
```

## 测试图片

​![image](https://img1.terwer.space/api/public/202402280948315.png)​

## 代码改写

```
学习
 /**
   * 向 Halo 请求数据
   *
   * @param url 请求地址
   * @param params 数据
   * @param method 请求方法 GET | POST | PUT | DELETE
   * @param header 请求头
   * @private
   */
  private async haloRequest(
    url: string,
    params?: any,
    method: "GET" | "POST" | "PUT" | "DELETE" = "POST",
    header: Record<any, any> = {}
  ): Promise<any> {
    const contentType = "application/json"
    const basicAuth = "Basic " + Base64.btoa(this.cfg.username + ":" + this.cfg.password)
    const headers = {
      "Content-Type": contentType,
      Authorization: basicAuth,
      ...header,
    }

    // 打印日志
    const apiUrl = `${this.cfg.apiUrl}${url}`
    this.logger.debug("向 Halo 请求数据，apiUrl =>", apiUrl)
    this.logger.debug("向 Halo 请求数据，params =>", params)

    // 使用兼容的fetch调用并返回统一的JSON数据
    const body = ObjectUtil.isEmptyObject(params) ? "" : JSON.stringify(params)
    const resJson = await this.proxyFetch(apiUrl, [headers], body, method, contentType)
    this.logger.debug("向 Halo 请求数据，resJson =>", resJson)

    return resJson ?? null
  }

然后根据上面的格式帮忙实现 telegraphRequest，给出具体代码。
```

```
学习
 /**
   * 向 Telegraph 请求数据
   *
   * @param content 请求内容
   * @param access_token 访问令牌
   * @param method 请求方法 GET | POST | PUT | DELETE
   * @param header 请求头
   * @private
   */
  private async telegraphRequest(
    content: string,
    access_token: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "POST",
    header: Record<any,> = {}
  ): Promise<any> {
    const contentType = "application/json"
    const headers = {
      "Content-Type": contentType,
      "Authorization": "Bearer " + access_token,
      ...header,
    }

    // 输出日志
    const apiUrl = `${this.cfg.telegraphApiUrl}`
    this.logger.debug("向 Telegraph 请求数据，apiUrl =>", apiUrl)
    this.logger.debug("向 Telegraph 请求数据，content =>", content)

    // 使用兼容的fetch调用并返回统一的JSON数据
    const body = content
    const resJson = await this.proxyFetch(apiUrl, [headers], body, method, contentType)
    this.logger.debug("向 Telegraph 请求数据，resJson =>", resJson)

    return resJson ?? null
  }
```

2222

‍
