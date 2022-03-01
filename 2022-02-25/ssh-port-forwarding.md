# ssh tunnel - SSH Port Forwarding 

之前在五倍紅寶石 , 看到了自製 Ngrok , 學了一段時間 , 覺得很卡的觀念是 ssh tunnel 到底是什麼東東 & 它要如何設定

下面是我用 putty.exe 設定 ssh tunnel , 並用 `draw.io` 畫一張架構圖 , 方便一個月後的自己也了解這東西 , 是如何運作的 ? 

## 前置準備

- 在 Digital Ocean 上開啟一台 Droplet 機器 ( 已安裝 Node.exe )
- Putty.exe 
- 你的筆電 ( 已安裝 Node.exe )
- server.js 

```javascript
// server.js 
const http = require('http'); // 1 - 載入 Node.js 原生模組 http
const port = 4000;
const server = http.createServer(function (req, res) {   // 2 - 建立server

    // 在此處理 客戶端向 http server 發送過來的 req。
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`成功訪問 Express Server - http://${req.headers && req.headers.host}`);
});

server.listen(port, () => {
    console.log(`Node.js web success open at http://localhost:${server.address().port}`);
}); //3 - 進入此網站的監聽 port, 就是 localhost:xxxx 的 xxxx
```

其實 ssh tunnel 的 SSH Port Forwarding 是有方向性的

之前在做測試的時候 , 一直把它當成網路設定 , 以為只要建立通道 , 就可以做連線

不過它其實是有 Remote 跟 Local 兩種設定 , 下面來用圖解說明吧 ! 

![圖一](圖一.png)

如果遠端 & 本地端都有 2 台電腦

利用 SSH 建立一個通道 (Tunnel) 我們稱為 SSH tunnel

如果使用 Local 設定 Port Forwarding

![圖二](圖二.png)

筆電 :18080 -> 雲端機器 Private IP :8080 ( 在筆電用瀏覽器開啟 local:18080 時可以看到 "雲端機器 :8080" 的頁面 )

> Local 的設定會將筆電的 18080 Port 導向 雲端機器的 8080 Port , 不過反過來沒有 X

使用 Remote 設定 Port Forwarding

![圖三](圖三.png)

用 putty 連上後你可以發現執行在本筆電 port 5000 的服務 , 被轉址到 `雲端主機` 的 4000 port 上了 ! 

雲端機器 :4000 -> 筆電 Private IP :5000 ( 用瀏覽器訪問 雲端機器_hostname:4000 時可以看到 "筆電 :5000" 的頁面 )

> Local 的設定會將筆電的 18080 Port 導向 雲端機器的 8080 Port , 不過反過來沒有 X

不過反過來 , 就不能通過了


## 參考資料

- [ngrok 不求人：自己搭一個窮人版的 ngrok 服務](https://5xruby.tw/posts/easy-ngrok-by-nginx-ssh-tunnel)
