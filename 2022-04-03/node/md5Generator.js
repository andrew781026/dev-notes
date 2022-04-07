const md5 = require('md5');
const fs = require("fs");
const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

/*
MD5Generator.prototype.generate = function ({
                                                file,
                                                env = 'main thread',
                                            }) {
}
 */

const queue = []
let isRunning = false

const MD5Generator = function ({
                                   file,
                                   env = 'main thread',
                               }) {

    return new Promise((resolve, reject) => {

        // 參考 : https://betterprogramming.pub/a-memory-friendly-way-of-reading-files-in-node-js-a45ad0cc7bb6
        const CHUNK_SIZE = 1024 * 1024 * 10; // 10MB
        let md5Str = '';
        const reader = fs.createReadStream(file, {highWaterMark: CHUNK_SIZE});

        reader.on('data', function (chunk) {
            md5Str += md5(chunk)
        });

        reader.on('end', () => resolve({file, md5: md5Str}))
        reader.on('error', err => reject(err))
    })
}


const runner = () => {

    if (queue.length > 0) {

        isRunning = true

        const target = queue.shift()

        setTimeout(() => {

            MD5Generator({file: target.file, env: target.env})
                .then(console.dir)
                .catch(console.error)
                .finally(runner)

        }, 0)

    } else isRunning = false
}

const MD5 = {
    compute: ({file, env}) => {

        queue.push({file, env})

        // 呼叫 runner to run 而且只有一個 runner
        if (!isRunning) runner()
    }
}

const file1 = "C:\\Users\\andrew\\Downloads\\Docker Desktop Installer.exe"

MD5.compute({file: file1, env: 'main thread'});
console.log('good')
MD5.compute({file: file1, env: 'main thread'});
console.log('good')
MD5.compute({file: file1, env: 'main thread'});
console.log('good')
MD5.compute({file: file1, env: 'main thread'});
MD5.compute({file: file1, env: 'main thread'});
MD5.compute({file: file1, env: 'main thread'});
MD5.compute({file: file1, env: 'main thread'});
MD5.compute({file: file1, env: 'main thread'});
MD5.compute({file: file1, env: 'main thread'});
// runner()

/*
    MD5.addEventListener('computed', ({ filename, md5 }) => {
      console.log(filename, md5);
    });
    MD5.generate({ file: file1, env: 'worker' });
    // or MD5.compute({ file: file1, env: 'main thread' });

    // console:
    // "file1.png" "{file1 md5}"

    Need to have queue feature (first in, first out), ex:
    ``` MD5.addEventListener(‘computed’, ({ filename, md5 }) => { console.log(filename, md5); });
        MD5.generate({ file: file1 }); MD5.generate({ file: file2 });
// Output:
// “file1.png” “{file1 md5}”
// “file2.pdf” “{file2 md5}”
 */
