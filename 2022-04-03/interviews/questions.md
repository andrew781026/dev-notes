# 紀錄一下 , SWAG 面試時的一些有趣的題目

1. 第一關 ( 與初階前端工程師面試 ) , 面試的白板題目 debounce . throttle

- 請自我介紹 

2. 第二關 ( 與資深前端工程師 / 用人主管 <Bill> 面試 )  , 面試的白板題目 flatten the array 

- 請說明你之前遇到的困難問題 & 你是如何解決他的 ? 

- webpack 有 chunk hash 跟 content hash 兩者有什麼區別 ? 

- Cookie 有 httpOnly 跟 Secure 兩個參數 , 請問這兩個參數的作用是 ?

- 請說明 cache

- object.defineproperty 跟 Proxy 的差異 ( Vue2 與 Vue3 的基礎核心之不同 )
 
- 如何防止影片的盜取 ? ( 面試官提到 , Netflix 用截圖時 , 影片區塊是黑色的 )

> https://stackoverflow.com/questions/63175756/how-does-netflix-prevent-users-from-taking-screenshots-of-chrome-browser
> https://en.wikipedia.org/wiki/Encrypted_Media_Extensions

- 圖片 or 影片加載太慢 , 可以如何處理 ? 

答 : 用 cloudinary

- infinite scroll 太長 , 會造成記憶體不夠用 , 要如何處理 ?

答 : 只顯示當前看的到的內容 , 前面看不到的內容 , 可以用一個 div 取代 , 來達到記憶體回收的效果
> 可能需要研究一下 JS 的記憶體回收
> https://stackoverflow.com/questions/12613113/performance-with-infinite-scroll-or-a-lot-of-dom-elements
> https://medium.com/walmartglobaltech/infinite-scrolling-the-right-way-11b098a08815

- 前端未來的發展 ? 

- 請問如何你會如何規劃測試計畫 ?  ( 面試官提到 , 公司 QA 使用 Source Lab 來做不同瀏覽器的測試 )

- 如何查看 網頁效能 & 調教 ?

( 面試官提到 , 可以用 Lighthouse 跟 Chrome Performance Panel )

- 如何設定 Github Action 將不同的分支 , 建立子頁面 ? 

3. 第三關 ( 與人資面試 ) - 請問你平常是個怎樣的人 ?
