

![](./chrome-extension/icon.png)

> 开启filter单选模式，支持方向键快速切换

![](./screenshot.gif)

## Design

- jira看板页面追加开关按钮，设置开启，开启时，捕获点击拦截器事件，取消其它已经active的filter
- 光标聚焦在看板filter中时，监听方向按键，计算光标所在元素位置信息，根据方向键盘+位置信息，获取移动后的目标元素信息，实现焦点获取


在线测试地址:https://demo-jira.stiltsoft.com/secure/Dashboard.jspa

## Bundle

```
crx pack -o jiraTool.crx
crx pack --zip-output jiraTool.zip

```

## Install

1. [Chrome webstore](https://chrome.google.com/webstore/detail/jira-tool/bifineglhieejpkhnfnfemcbpadpdooi)
3. Unpacked Install
   ![image](https://user-images.githubusercontent.com/9245110/113583783-a8ea0a00-965c-11eb-95df-cc26cd497e11.png)
