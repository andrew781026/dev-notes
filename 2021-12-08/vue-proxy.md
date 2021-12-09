
```javascript
// vue.config.js
module.exports = {

    // 參考資料 : https://book.vue.tw/CH3/3-3-vue-dev-server-build.html#%E9%96%8B%E7%99%BC%E6%99%82%E7%9A%84%E8%B7%A8%E7%B6%B2%E5%9F%9F%E5%AD%98%E5%8F%96-proxy-devserver
    devServer: {
        host: '127.0.0.1',
        port: 8084,
        open: true,// vue项目启动时自动打开浏览器
        proxy: {
            '/api': { // '/api'是代理标识，用于告诉node，url前面是/api的就是使用代理的
                target: "http://xxx.xxx.xx.xx:8080", //目标地址，一般是指后台服务器地址
                changeOrigin: true, //是否跨域
                pathRewrite: { // pathRewrite 的作用是把实际Request Url中的'/api'用""代替
                    '^/api': ""
                }
            }
        }
    }
}

```
