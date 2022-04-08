const fs = require("fs");
const {Worker} = require('worker_threads');

const directory = "C:/Users/andrew/Downloads/" // 下載資料夾
const queue = []
const workers = []
const workerNumber = 10;

const getWorkerData = () => ({file: queue.shift()})

// flag = w ( 會 recreate 檔案 )
// 'w': Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
fs.writeFile("info.txt", '', {encoding: "utf8", flag: "w"}, _ => _);

// List all files in a directory in Node.js recursively in a synchronous fashion
const walkSync = function (dir, filelist = []) {
    const files = fs.readdirSync(dir);
    files.forEach(function (file) {
        if (fs.statSync(dir + file).isDirectory()) {
            filelist = walkSync(dir + file + '/', filelist);
        } else {
            filelist.push(dir + file);
        }
    });
    return filelist;
};

walkSync(directory, queue);

const addWorker = () => {

    const worker = new Worker('./workerThread.js');

    worker.on('message', (message) => {
        // console.log('message=', message);  // 將資料記錄到 txt 檔案中

        const data = `檔案名稱：${message.file}\nmd5 HASH：${message.md5}\n-----------------------\n`

        fs.writeFile("info.txt", data, {encoding: "utf8", flag: "a+"}, _ => _);

        if (queue.length > 0) worker.postMessage(getWorkerData())
    });

    workers.push(worker)
}

// 將新任務塞給沒在工作的 worker
const awakeWorker = () => {

    // 這邊來處理任務
    workers.forEach(worker => worker.postMessage(getWorkerData()))
}

// 先建立 10 個工作人員
new Array(workerNumber).fill().forEach(() => addWorker())

setTimeout(awakeWorker, 0)
