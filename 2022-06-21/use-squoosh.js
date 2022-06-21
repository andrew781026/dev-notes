const fsPromises = require('node:fs/promises');
const EventEmitter = require('node:events');
const path = require('path');
const {ImagePool} = require('@squoosh/lib');
const imagePool = new ImagePool();

const minify = async (target, dest) => {

    const image = imagePool.ingestImage(target);

    await image.decoded; //Wait until the image is decoded before running preprocessors.

    const preprocessOptions = {
        /*
        //When both width and height are specified, the image resized to specified size.
        resize: {
            enabled: true,
            width: 100,
            height: 50,
        }
        */
        /*
        //When either width or height is specified, the image resized to specified size keeping aspect ratio.
        resize: {
          enabled: true,
          width: 100,
        }
        */
    }
    await image.preprocess(preprocessOptions);

    const encodeOptions = {
        mozjpeg: {}, //an empty object means 'use default settings'
        jxl: {
            quality: 90,
        },
    }
    await image.encode(encodeOptions);

    const rawEncodedImage = (await image.encodedWith.mozjpeg).binary;

    await fsPromises.writeFile(dest, rawEncodedImage);
    return target;
}

const runner01 = async (target, dest) => {

    const isDirectory = async filePath => (await fsPromises.lstat(filePath)).isDirectory();

    if (!await isDirectory(target)) return await minify(target, dest);
    else {

        const workerNo = 5;
        const result = [];

        const myEmitter = new EventEmitter();
        myEmitter.on('working', function (target, dest) {

            const worker = (target, dest) => minify(target, dest)
                .then((minified) => {
                    console.log(minified, 'is minified');
                    const {target, dest} = result.shift() || {};
                    if (target) worker(target, dest);
                })
                .catch(err => myEmitter.emit('error', err));

            worker(target, dest);
        });
        myEmitter.on('error', err => {
            console.error(err);
            process.exit(0);
        });

        const files = await fsPromises.readdir(target);
        files.forEach(filePath =>
            result.push({target: path.resolve(target, filePath), dest: path.resolve(dest, filePath)})
        );
        for (let i = 0; i < workerNo; i++) {
            const {target, dest} = result.shift();
            myEmitter.emit('working', target, dest);
        }
        return ''
    }
}

runner01(path.resolve(__dirname, 'imgs'), path.resolve(__dirname, 'output'))
    .catch(console.error);
