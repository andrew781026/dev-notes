const SparkMD5 = require("spark-md5");
const fs = require("fs");

function toArrayBuffer(buf) {
    const ab = new ArrayBuffer(buf.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}

function toBuffer(ab) {
    const buf = Buffer.alloc(ab.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}


const MD5Generator = function (file) {

    return new Promise((resolve, reject) => {

        // 參考 : https://betterprogramming.pub/a-memory-friendly-way-of-reading-files-in-node-js-a45ad0cc7bb6
        const CHUNK_SIZE = 1024 * 1024 * 10; // 10MB
        const spark = new SparkMD5.ArrayBuffer();
        const reader = fs.createReadStream(file, {highWaterMark: CHUNK_SIZE});

        reader.on('data', function (chunk) {
            spark.append(toArrayBuffer(chunk))
        });

        reader.on('end', () => resolve({file, md5: spark.end()}))
        reader.on('error', err => reject(err))
    })
}

module.exports = MD5Generator;
