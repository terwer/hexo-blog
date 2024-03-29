---
title: Nuxt3和Vue3集成FontAwesome
date: '2022-10-09 23:05:51'
updated: '2022-10-09 23:05:51'
excerpt: 安装依赖yarnadd@fortawesomefontawesomesvgcoreyarnadd@fortawesomefreebrandssvgiconsyarnadd@fortawesomefreesolidsvgiconsyarnadd@fortawesomevuefontawesome添加nuxt插件在nuxt的项目根目录新建plugins文件夹然后新建文件fontawesomeplugints代码如下import{library}from@fortawesomefontawesomesvgcor
tags:
  - 使用
  - 安装
  - 依赖
  - 添加
  - font
  - awesome
  - font-awesome
  - vue
  - nuxt
  - vue3
  - nuxt3
  - 新建
categories:
  - 前端开发
permalink: /post/nuxt3-and-vue3-integrated-fonwesome-276ubg.html
comments: true
toc: true
---
## 安装依赖

```bash
yarn add @fortawesome/fontawesome-svg-core
yarn add @fortawesome/free-brands-svg-icons
yarn add @fortawesome/free-solid-svg-icons
yarn add @fortawesome/vue-fontawesome
```

## 添加 Nuxt 插件

在 Nuxt3 的项目根目录新建 `plugins` 文件夹

然后新建文件 `fontawesomePlugin.ts` ，代码如下

```ts
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faSms, faHome, faBolt, faBook, faJar,faUser,faGear} from '@fortawesome/free-solid-svg-icons'
import {faFacebook, faTwitter} from '@fortawesome/free-brands-svg-icons'

library.add(faTwitter)
library.add(faFacebook)
library.add(faSms)
library.add(faHome)
library.add(faBook)
library.add(faBolt)
library.add(faJar)
library.add(faUser)
library.add(faGear)

export default defineNuxtPlugin((nuxtApp) => {
    // @ts-ignore
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
```

## 使用图标

最后在 `Vue` 组件中直接使用即可，例如

```html
<font-awesome-icon :icon="fa-home"/>
```