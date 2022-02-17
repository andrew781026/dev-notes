# `bottleneck` - 避免短時間內多次呼叫同一支 API 的救星 

在 Vue 中會切分許多的區塊 , 而他們可能會用到相同的資料源

這時會造成同時多次呼叫同一個 API , 那要如何避免多次呼叫的事情發生呢 ?

- 教學文章 : https://dev.to/rcoundon/rate-limiting-api-calls-sometimes-a-bottleneck-is-a-good-thing-1h5o

我們可以使用 [bottleneck](https://www.npmjs.com/package/bottleneck) 來避免這事情發生

如果在 React 中就是 React SWR 

- [React SWR | 取得遠端資料的殺手級函式庫](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-swr-485b8e41ef78)
