# 瀏覽器原生 Fetch API 筆記

> 整理 `Fetch API` 的一些用法

1. 如何使用 Get 方法 ?

```javascript
fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));
```

2. 如何上傳一個 JSON 檔案 ?

```javascript
const data = { username: 'example' };

fetch('https://example.com/profile', {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
    .then(response => response.json())
    .then(data =>  console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
```

3. 如何上傳一個檔案 ?

```javascript
const formData = new FormData();
const fileField = document.querySelector('input[type="file"]');

formData.append('username', 'abc123');
formData.append('avatar', fileField.files[0]);

fetch('https://example.com/profile/avatar', {
    method: 'PUT',
    body: formData
})
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

4.如何顯示下載進度 ?

- 利用 `response.body.getReader();` [文章](https://dev.to/tqbit/how-to-monitor-the-progress-of-a-javascript-fetch-request-and-cancel-it-on-demand-107f) / [套件 - fetch-progress](https://www.npmjs.com/package/fetch-progress)
- 利用 `ReadableStream`  


5.如何顯示上傳進度 ?

- 利用 `ReadableStream`

### 參考資料 

- [Using_Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) 
- [越来越火的网络请求Fetch和Axios到底有什么区别](https://juejin.cn/post/6934155066198720519) 
- [How to monitor the progress of a Javascript fetch - request and cancel it on demand.](https://dev.to/tqbit/how-to-monitor-the-progress-of-a-javascript-fetch-request-and-cancel-it-on-demand-107f)
- [fetch upload streaming](https://web.dev/fetch-upload-streaming/)
- [How to get File upload progress with fetch() and WhatWG streams](https://www.py4u.net/discuss/344454)
