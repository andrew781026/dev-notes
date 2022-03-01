# ssh tunnel - SSH Port Forwarding 

之前在五倍紅寶石 , 看到了自製 Ngrok , 學了一段時間 , 覺得很卡的觀念是 ssh tunnel 到底是什麼東東 & 它要如何設定

下面是我用 putty.exe 設定 ssh tunnel , 並用 `draw.io` 畫一張架構圖 , 方便一個月後的自己也了解這東西 , 是如何運作的 ? 

## 前置準備

- 在 Digital Ocean 上開啟一台 Droplet 機器 ( 已安裝 Node.exe )
- Putty.exe 
- 你的筆電 ( 已安裝 Node.exe )
- [server.js](https://github.com/andrew781026/dev-notes/blob/master/2022-02-25/server.js) 

> 特別觀念

其實 ssh tunnel 的 SSH Port Forwarding 是有方向性的

之前在設定時 , 我誤以為它是雙向的 , 因此常常發生設定後 , 連不上任何東西的尷尬情況

有方向性 , 因此有 Remote 跟 Local 兩種設定 , 那要如何設定呢 ? 下面來用圖解說明吧 ! 

![圖一](圖一.png)

如果遠端 & 本地端都有 2 台電腦

利用 SSH 建立一個通道 (Tunnel) 我們稱為 SSH tunnel

### 將筆電端的 6000 port 轉到 雲端機器的 7000 port (使用 Local 設定 Port Forwarding)

> 筆電 :6000 -> 雲端機器 Private IP :7000 ( 在筆電用瀏覽器開啟 local:6000 時可以看到 "雲端機器 :7000" 的頁面 )

![圖二](圖二.png)

在 "雲端機器" 用 node 在 7000 port 上啟動 server.js

```shell
~$ node server.js 7000 
```

```shell
~$ sudo ufw enable
~$ sudo ufw allow 6000
~$ sudo ufw allow 7000
```

由於 ubuntu 預設會將外部訪問 port 做關閉 , 因此需要將其打開才能做 port forwarding

> Local 的設定會將筆電的 6000 Port 導向 雲端機器的 7000 Port , 不過反過來沒有 X

在雲端機器上啟用 7000 port 的 server.js , 在筆電上 6000 port 會取到資料



> Local 的設定會將筆電的 18080 Port 導向 雲端機器的 8080 Port , 不過反過來沒有 X


使用 Remote 設定 Port Forwarding

![圖三](圖三.png)

用 putty 連上後你可以發現執行在本筆電 port 5000 的服務 , 被轉址到 `雲端主機` 的 4000 port 上了 ! 

雲端機器 :4000 -> 筆電 Private IP :5000 ( 用瀏覽器訪問 雲端機器_hostname:4000 時可以看到 "筆電 :5000" 的頁面 )

當我們用 `curl http://localhost:4000` 測試的時候 , 可以訪問到筆電中 port 5000 的 server 

![筆電5000對雲端4000](筆電5000對雲端4000.png)

------




## 參考資料

- [ngrok 不求人：自己搭一個窮人版的 ngrok 服務](https://5xruby.tw/posts/easy-ngrok-by-nginx-ssh-tunnel)
