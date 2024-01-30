
//const playAudioFile = require('audic');

const mineflayer = require('mineflayer')
const term = require('node-terminal-tools')


const creds = require('./creds.json')

const command = require('./commands/command.js');
const Mud = require('./model/mud');


const bot = mineflayer.createBot({
  host: 'localhost', // minecraft server ip
  username: creds.username, // username or email, switch if you want to change accounts
  auth: 'offline',//'microsoft' // for offline mode servers, you can set this to 'offline'
  port: 64690,                // only set if you need a port that isn't 25565
  version: "1.20",             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
  // password: '12345678'        // set if you want to use password-based auth (may be unreliable). If specified, the `username` must be an email
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return
  bot.chat(message)
  console.log(username)
})

bot.on('spawn', () => {
    bot.entity.position.x = Math.floor(bot.entity.position.x) + .5;
    bot.entity.position.z = Math.floor(bot.entity.position.z) + .5;
})

// Log errors and kick reasons:
bot.on('kicked', console.log)
bot.on('error', console.log)

//bot.on("soundEffectHeard", () => {playAudioFile('./media/sounds/beep.mp3')})

const mud = new Mud(bot)

export var currentMessage = ""

term.input.addCallback((d) => {
  for(let i = 0; i < d.length; i++) {
    if (d == '\r') {
      command.doCommand(bot, currentMessage)
      currentMessage = ""
    }
    else {
      currentMessage += d[i]
    }
  }
})
term.input.startListening()



