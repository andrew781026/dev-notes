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

