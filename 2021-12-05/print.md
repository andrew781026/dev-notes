# 前端列印的那些事

雖然明年 2022 年 , 推行公司無紙化也有許多年頭了 , BUT 由於稽核 . 會計 ...等原因 , 
我們還是需要將紙本印出來 , 然後給主管簽名蓋章

身為前端人員當然有時也會被要求幫忙處理列印的相關事情 , 當我開始處理後 , 發現這個 issue 真的是不太容易的事

因此在此紀錄 , 免得自己的金魚腦 , 讓我 1 個月後忘記 `當初` 到底是如何處理的

有幾個方向可以處理列印的問題

1. 都丟給後端處理
2. 請後端傳輸 PDF 到前端 , 由前端打開瀏覽器的列印介面
3. 前端製作 html . css 以符合列印的格式 , 請使用者列印出來 
4. 根據第三點的 html . css 產生圖片 , 並直接打開瀏覽器的列印介面
5. 前端 coding 一份 pdf , 並直接打開瀏覽器的列印介面

---

叫出列印介面 , 我們可以利用 [printJS](https://printjs.crabbly.com/) 這個套件來輔助處理

比如說 , 直接列印 html 表單

```javascript
printJS('formId', 'html')
```

或是直接列印後端回傳的 PDF 檔案

```javascript
printJS({printable: base64, type: 'pdf', base64: true})
```

五 . 前端 coding 一份 pdf , 並直接打開瀏覽器的列印介面

這時我們就需要用 [jsPDF](https://github.com/parallax/jsPDF) 建立我們要列印的 pdf 



## 參考資料

- [Javascript 將 html 轉成 pdf ,下載,支援多頁哦（html2canvas 和 jsPDF）](https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/26393/)
- [iframe 的安全性(一)](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/716274/)
