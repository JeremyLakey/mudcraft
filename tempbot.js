
//const playAudioFile = require('audic');

const mineflayer = require('mineflayer')
const term = require('node-terminal-tools')


const creds = require('./creds.json')


const bot = mineflayer.createBot({
  host: 'localhost', // minecraft server ip
  username: creds.username, // username or email, switch if you want to change accounts
  auth: 'offline',//'microsoft' // for offline mode servers, you can set this to 'offline'
  port: 64690,                // only set if you need a port that isn't 25565
  version: "1.20",             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
  // password: '12345678'        // set if you want to use password-based auth (may be unreliable). If specified, the `username` must be an email
})


bot.on('spawn', () => {
    bot.entity.position.x = Math.floor(bot.entity.position.x) + .5;
    bot.entity.position.z = Math.floor(bot.entity.position.z) + .5;
})

setTimeout(() => {
    console.log(bot.inventory)
    exit()
}, 10000)