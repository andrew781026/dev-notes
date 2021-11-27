# 前端的打包工具比較

原本在 IE 還活著的時代 Webpack , 已經一統天下了 , 
不過當微軟宣布 [2022 年 6 月 15 日後就不再維護 IE 11](https://docs.microsoft.com/zh-tw/lifecycle/announcements/internet-explorer-11-end-of-support) 後 , 
事情有了變化 , 一些不理會 IE 的打包工具 ( [snowpack](https://github.com/withastro/snowpack) . [rollup](https://rollupjs.org/guide/en/) . [vite](https://vitejs.dev/) )
因為 build 的速度較快的原因開始冒出頭來 , 
- Q : 為何它們的癲一速度可以變比較快呢 ?
- A : 因為他們可以不管 IE 的死活 , 不用編譯 umd . cjs . IIFE ...等類型的檔案 , 只需要顧慮 esm 模式即可

## 參考資料

- [深度分析前端构建工具：Vite2 v.s Snowpack3 v.s. Webpack5](https://segmentfault.com/a/1190000039370642)