// add this code snippet to main.js
const {parentPort, workerData} = require("worker_threads");
const fs = require("fs");
const md5 = require("md5");

parentPort.postMessage(MD5Generator(workerData))

const MD5Generator = async function ({
                                         file,
                                         env = 'main thread',
                                     }) {

    // 參考 : https://betterprogramming.pub/a-memory-friendly-way-of-reading-files-in-node-js-a45ad0cc7bb6
    const CHUNK_SIZE = 10000000; // 10MB
    let md5Str = '';
    const stream = fs.createReadStream(file, {highWaterMark: CHUNK_SIZE});
    for await (const data of stream) {
        md5Str += md5(data)
    }

    return {file, md5: md5Str}
}