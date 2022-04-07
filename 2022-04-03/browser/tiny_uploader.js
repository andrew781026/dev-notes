function getMD5(file) {

    return new Promise((resolve, reject) => {

        const fileSize = file.size;
        const spark = new SparkMD5.ArrayBuffer();
        const fileReader = new FileReader();
        const chunkSize = 1024 * 1024 * 2;                   // Read in chunks of 2MB
        const chunks = Math.ceil(fileSize / chunkSize);
        let currentChunk = 0;

        fileReader.onload = function (e) {
            console.log('read chunk nr', currentChunk + 1, 'of', chunks);
            spark.append(e.target.result);                   // Append array buffer
            currentChunk++;

            if (currentChunk < chunks) {
                loadNext();
            } else {
                console.log('finished loading');
                const hash = spark.end() /* Compute hash */
                // console.info('computed hash', spark.end());  // Compute hash
                resolve({filename: file.name, hash})
            }
        };

        fileReader.onerror = err => {
            console.warn('oops, something went wrong.');
            reject(err)
        };

        function loadNext() {
            const start = currentChunk * chunkSize;
            const end = ((start + chunkSize) >= fileSize) ? fileSize : start + chunkSize;

            fileReader.readAsArrayBuffer(file.slice(start, end));
        }

        loadNext();
    })
}
