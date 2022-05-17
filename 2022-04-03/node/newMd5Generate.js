const MD5Generator = require('./generator');

const queue = []
let isRunning = false

const runner = () => {

    if (queue.length > 0) {

        isRunning = true

        const target = queue.shift()

        setTimeout(() => {

            MD5Generator(target.file)
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

module.exports = MD5
