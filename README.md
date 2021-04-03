

![](./chrome-extension/icon.png)

## Design

jira看板页面追加开关按钮，设置开启，开启时，捕获点击拦截器事件，实现原先点击过滤器再次点击，进行取消。

在线测试地址:https://demo-jira.stiltsoft.com/secure/Dashboard.jspa

## Bundle

```
crx pack -o jiraTool.crx
crx pack --zip-output jiraTool.zip

```                                                