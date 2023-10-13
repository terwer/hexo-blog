---
title: 性能测试
date: '2023-10-12 21:18:01'
updated: '2023-10-13 19:21:34'
permalink: /post/performance-testing-rulh5.html
comments: true
toc: true
---

# 性能测试

```js
(async () => {
    let __costs = []
    for (let i of [...Array(50).keys()]) {
        siyuan.dialogs[0]?.destroy();
        // 打开插件的常规发布页面
        document.getElementById("plugin_siyuan-plugin-publisher_0").click();
        let menuitem = await waitForElement(document.querySelector('#commonMenu > .b3-menu__items'), "#commonMenu > div.b3-menu__items > button:nth-child(3)");
        let start = Date.now();  
        menuitem.click();
        // 等待插件页面加载完成
        let frame = await waitForElement(document.body, "body > div.b3-dialog--open > div > div.b3-dialog__container > div.b3-dialog__body > iframe")
        await new Promise((r) => {
          frame.contentWindow.addEventListener('DOMContentLoaded', () => r());
        })
        await waitForElement(frame.contentDocument, "#app-layout-default > div.default-main > div.platform-desc > p > div > div.el-alert__content")
        // 计算时间
        let cost = Date.now() - start;
        console.log('cost', i, cost)
        __costs.push(cost);
        siyuan.dialogs[0]?.destroy();
    }
    console.log("avg cost:", __costs.reduce((a, b) => a + b, 0) / __costs.length);
})();

function waitForElement(rootElement, cssSelector) {
  return new Promise((resolve) => {
    const element = rootElement.querySelector(cssSelector);
    if (element) {
      resolve(element);
    } else {
      const observer = new MutationObserver(() => {
        const targetElement = rootElement.querySelector(cssSelector);
        if (targetElement) {
          observer.disconnect();
          resolve(targetElement);
        } else {
          console.log('not found')
        }
      });

      const config = {
        childList: true,
        subtree: true,
        attributes: true
      };

      observer.observe(rootElement, config);
    }
  });
}
```
