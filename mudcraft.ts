
//const playAudioFile = require('audic');
import * as mineflayer from "mineflayer"
import { Bot } from "mineflayer"
const term = require('node-terminal-tools')

import * as creds from './creds.json'
import { Entity } from 'prismarine-entity'
import { Block } from 'prismarine-block'


import Mud from './model/mud'

import doCommand from './commands/command.js'
const display = require('./display/display.js')
const { loadBlocks } = require('./display/loadblocks.js')

var botHealth: number = 0;

const bot: Bot = mineflayer.createBot({
  host: 'localhost', // minecraft server ip
  username: creds.username, // username or email, switch if you want to change accounts
  auth: 'offline',//'microsoft' // for offline mode servers, you can set this to 'offline'
  port: 64690,                // only set if you need a port that isn't 25565
  version: "1.20.1",             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
  // password: '12345678'        // set if you want to use password-based auth (may be unreliable). If specified, the `username` must be an email
})

bot.on('chat', (username: String, message: String) => {
  if (username === bot.username) return
  mud.addHistory(username + ": " + message)
})

bot.on('whisper', (username: String, message: String) => {
  if (username === bot.username) return
  mud.addHistory(username + " **whispers**: " + message)
})

bot.on('entityDead', (entity: Entity) => {
  mud.addHistory("An " + entity.displayName + " died")
})

var breathCount = 0
bot.on('breath', () => {
  breathCount++
  if (breathCount > 50) {
    mud.addHistory("O2 Level: " + bot.oxygenLevel)
    breathCount = 0
  }
})

bot.on('spawn', () => {
    bot.entity.position.x = Math.floor(bot.entity.position.x) + .5
    bot.entity.position.z = Math.floor(bot.entity.position.z) + .5
})

bot.once('spawn', () => {
  //mineflayerViewer(bot, { port: 3007, firstPerson: true }) // port is the minecraft server port, if first person is false, you get a bird's-eye view
  botHealth = bot.health
  bot.on('health', () => {
    if (bot.health > botHealth) {
      mud.addHistory("You heal " + (Math.round(bot.health) - Math.round(botHealth)) + " health")
    }
    else {
      mud.addHistory("You lost " + (Math.round(botHealth) - Math.round(bot.health)) + " health")
    }
    botHealth = bot.health
  })

  bot.on('diggingCompleted', (block: Block) => {
    mud.addHistory(block.name.charAt(0).toUpperCase() + block.name.slice(1) + " digged")
  })

  bot.on('diggingAborted', (block: Block) => {
    mud.addHistory("Could not digged " + block.name)
  })

  bot.on("entitySpawn", (entity: Entity) => {
    const name = entity.name ? entity.name : entity.type
    mud.addHistory(entity.name + " has appeared")
  })

  bot.on("entityDead", (entity: Entity) => {
    const name = entity.name ? entity.name : entity.type
    mud.addHistory(entity.name + " died")
  })

  bot.on("entityHurt", (entity: Entity) => {
    const name = entity.name ? entity.name : entity.type
    mud.addHistory(entity.name + " took damage")
  })
  
  bot.on("entityTamed", (entity: Entity) => {
    const name = entity.name ? entity.name : entity.type
    mud.addHistory(entity.name + " was tamed")
  })

  bot.on("chestLidMove", (block: Block, isOpen: number, block2: Block | null) => {
    if (isOpen > 0) {
      mud.addHistory("A chest was open")
    }
  })

  bot.on("playerCollect", (collector: Entity, collected: Entity) => {
    if (collector.uuid == bot.entity.uuid) {
      mud.addHistory("You picked up " + Entity.name)
    }
  })
})



// Log errors and kick reasons:
bot.on('kicked', console.log)
bot.on('error', console.log)

// bot.on('soundEffectHeard', (soundName, position, volume, pitch) => {
//   mud.addHistory(soundName)
// })

// bot.on("hardcodedSoundEffectHeard", (soundId, soundCategory, position, volume, pitch) => {
//   mud.addHistory("You heard something: " + soundCategory + " " + soundId + " " + volume + " " + pitch)
// })

const mud = new Mud(bot)

term.input.hideCursor()

term.input.addCallback((d) => {
  for(let i = 0; i < d.length; i++) {
    if (d == '\x1b[A') {doCommand(mud, "north"); return;} // up
    if (d == '\x1b[C') {doCommand(mud, "east"); return;} // right
    if (d == '\x1b[B') {doCommand(mud, "south"); return;} // down
    if (d == '\x1b[D') {doCommand(mud, "west"); return;} // left
    if (d == '\r') {
      doCommand(mud, mud.currentMessage)
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
  loadBlocks(bot,mud.grid, mud.gridC)
  display.showDisplay(mud)
  setTimeout(displayTimeOut, 115)
}


setTimeout(displayTimeOut, 15)
