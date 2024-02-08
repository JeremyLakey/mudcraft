
//const playAudioFile = require('audic');

const mineflayer = require('mineflayer')
const term = require('node-terminal-tools')


const creds = require('./creds.json')

const command = require('./commands/command.js')
const display = require('./display/display.js')
const Mud = require('./model/mud')
const { loadBlocks } = require('./display/loadblocks.js')


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

term.input.hideCursor()

term.input.addCallback((d) => {
  for(let i = 0; i < d.length; i++) {
    if (d == '\x1b[A') {command.doCommand(mud, "north"); continue;} // up
    if (d == '\x1b[C') {command.doCommand(mud, "east"); continue;} // right
    if (d == '\x1b[B') {command.doCommand(mud, "south"); continue;} // down
    if (d == '\x1b[D') {command.doCommand(mud, "west"); continue;} // left
    if (d == '\r') {
      command.doCommand(mud, mud.currentMessage)
      mud.currentMessage = ""
    }
    else if (d == '\b') {
      mud.currentMessage = mud.currentMessage.slice(0, -1)
    }
    else {
      mud.currentMessage += d[i]
    }
  }
})
term.input.startListening()

const displayTimeOut = () => {
  loadBlocks(bot,mud.grid)
  display.showDisplay(mud)
  setTimeout(displayTimeOut, 115)
}


setTimeout(displayTimeOut, 15)
