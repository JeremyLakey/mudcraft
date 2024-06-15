const fs = require('fs');

var logstream = undefined

const log = (s) => {
    if (logstream) {
        logstream.write(s)
    }
}

const openLog = () => {
    logstream = fs.createWriteStream('./logs/log.txt', 'w+')
}

const closeLog = () => {
    logstream.end();
    logstream = undefined
}

export {openLog, closeLog, log}