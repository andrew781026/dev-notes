# Gulp 初體驗

## 為何需要使用 Gulp

有時在 編譯檔案 , 上傳檔案時 , 需要下很多指令 or 執行很多動作來達到 compile or deploy 的效果

這時我們就可以用 gulp.task 將我們需要執行的動作 , 包裝起來 ,

達成 `gulp deploy` 就可以上傳檔案的功用

那 gulp 的 task 要如何建立跟使用呢 ? 


## [安裝 & 第一次使用](https://gulpjs.com/docs/en/getting-started/quick-start)

安裝 gulp 指令到電腦中

```shell
~$ npm install --global gulp-cli
```

將 gulp 安裝到專案中

```shell
~$ npm install --save-dev gulp
```

確認 gulp 指令是否安裝成功

```shell
~$ gulp --version
```

確認 gulp 指令是否安裝成功

```shell
~$ gulp --version
```

建立 gulpfile.js

```javascript
const gulp = require('gulp');

gulp.task('hello-world', function(cb) {
  
  console.log('hello world');
  cb();
});
```

執行剛剛定義的 Task

```shell
~$ gulp hello-world
```
