# Iframe 的那些麻煩事

- 跨網域的 Iframe 處理 ( 其實防止跨網域 , 是 Iframe 的資安的一部分 )


> 一般 Iframe 只能用 GET , 那如果傳入參數過長 , 導致只能使用 POST 該如何處理呢 ?
 
 A1 . 請後端處理 , 將要處理的資料稍作 KEEP ( ex: 建立 Server Session & 使用 SessionId ) 
 A2 . 前端利用 Form 來 Submit 處理 Iframe 需要 POST 回來的資料
 A3 . 建立一個空內容的 Iframe 再將內容 append 到 IframeBody 上面 -> 採用此做法
 