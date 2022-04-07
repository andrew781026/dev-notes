const {parentPort, threadId} = require('worker_threads');
const MD5Generator = require("./generator");

console.log(`worker: threadId ${threadId} start with ${__filename}`);

// When a message from the parent thread is received, send it back:
parentPort.on('message', ({file}) => {

    MD5Generator(file)
        .then(obj => {
            // console.log('pid=', process.pid)
            console.log(`worker: threadId ${threadId} run on file = ${obj.file}`);
            return parentPort.postMessage(obj) // 將 md5Hash 值傳回給 mainThread
        })
        .catch(console.error)
});
