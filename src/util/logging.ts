import * as fs from 'fs'
var logstream = undefined

const log = (s) => {
    if (logstream) {
        logstream.write(s + "\n")
    }
}

const openLog = () => {
    logstream = fs.createWriteStream('./logs/log.txt', {flags:"w"})
}

const closeLog = () => {
    logstream.end();
    logstream = undefined
}

export {openLog, closeLog, log}