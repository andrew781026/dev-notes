const {
    Worker, isMainThread, parentPort, workerData, threadId
} = require('worker_threads');
const fs = require("fs");
const md5 = require("md5");

const MD5Generator = function ({
                                   file,
                                   env = 'main thread',
                               }) {

    return new Promise((resolve, reject) => {

        // 參考 : https://betterprogramming.pub/a-memory-friendly-way-of-reading-files-in-node-js-a45ad0cc7bb6
        const CHUNK_SIZE = 10000000; // 10MB
        let md5Str = '';
        const reader = fs.createReadStream(file, {highWaterMark: CHUNK_SIZE});

        reader.on('data', function (chunk) {
            md5Str += md5(chunk)
        });

        reader.on('end', () => resolve({file, md5: md5Str}))
        reader.on('error', err => reject(err))
    })
}

function mainThread() {

    const file1 = "C:\\Users\\User\\Downloads\\MovaviScreenRecorderSetupC.exe"

    let number = 10;

    for (let i = 0; i < number; i++) {

        const workerData = {file: file1}
        const worker = new Worker(__filename);

        worker.on('message', (message) => {
            console.log(message);  // Prints 'Hello, world!'.
        });

        worker.postMessage(workerData)
    }
}

function workerThread() {

    console.log(`worker: threadId ${threadId} start with ${__filename}`);

    // When a message from the parent thread is received, send it back:
    parentPort.on('message', ({file}) => {

        MD5Generator({file})
            .then(obj => {
                console.log('pid=', process.pid)
                return parentPort.postMessage(obj)
            })
            .catch(console.error)
    });
}

if (isMainThread) {
    mainThread();
} else {
    workerThread();
}
