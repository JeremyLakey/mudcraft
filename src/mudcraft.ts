
//const playAudioFile = require('audic');
import * as mineflayer from "mineflayer"
import { Bot } from "mineflayer"
const term = require('node-terminal-tools')


import * as creds from './creds.json'
import * as settings from './settings.json'
import { Entity } from 'prismarine-entity'
import { Block } from 'prismarine-block'

import {log} from "./util/logging"

import Mud from './model/mud.js'

import doCommand from './commands/command.js'
import showDisplay from './display/display.js'
import loadBlocks from './display/loadblocks.js'

var botHealth: number = 0;

const buildBot = (): Bot => {
  if (creds.authType == 'offline') {
    return mineflayer.createBot({
      host: settings.host, // minecraft server ip
      username: creds.username, // username or email, switch if you want to change accounts
      auth: 'offline',        // for offline mode servers, you can set this to 'offline'
      port: settings.port,           
      version: "1.20",             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
      // password: '12345678'        // set if you want to use password-based auth (may be unreliable). If specified, the `username` must be an email
    })
  }
  else {
    return mineflayer.createBot({
      host: settings.host, // minecraft server ip
      username: creds.username, // username or email, switch if you want to change accounts
      auth: 'offline',        // for offline mode servers, you can set this to 'offline'
      port: settings.port,           
      version: "1.20",             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
    })
  }
  
}

const bot: Bot = buildBot()

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
  if (breathCount > 50 && bot.oxygenLevel != 2) {
    mud.addHistory("O2 Level: " + bot.oxygenLevel)
    breathCount = 0
  }
})

bot.on('spawn', () => {
    bot.entity.position.x = Math.floor(bot.entity.position.x) + .5
    bot.entity.position.z = Math.floor(bot.entity.position.z) + .5
})

var firstHealthCheck = true;
bot.once('spawn', () => {
  //mineflayerViewer(bot, { port: 3007, firstPerson: true }) // port is the minecraft server port, if first person is false, you get a bird's-eye view
  
  bot.on('health', () => {
    if (firstHealthCheck) {
      botHealth = bot.health
      firstHealthCheck = false; // still initializing health
      return
    }

    if (bot.health > botHealth) {
      mud.addHistory("You heal " + (Math.round(bot.health) - Math.round(botHealth)) + " health")
    }
    else {
      mud.addHistory("You lost " + (Math.round(botHealth) - Math.round(bot.health)) + " health")
    }
    botHealth = bot.health
  })

  bot.on('diggingCompleted', (block: Block) => {
    mud.addHistory(mud.lastDigging.charAt(0).toUpperCase() + mud.lastDigging.slice(1) + " digged")
    mud.lastDigging = ""
  })

  bot.on('diggingAborted', (block: Block) => {
    mud.addHistory("Could not digged " + mud.lastDigging)
  })

  bot.on("entitySpawn", (entity: Entity) => {
    const name = entity.name ? entity.name : entity.type
    mud.addHistory(name + " has appeared")
  })

  bot.on("entityDead", (entity: Entity) => {
    const name = entity.name ? entity.name : entity.type
    mud.addHistory(name + " died")
  })

  bot.on("entityHurt", (entity: Entity) => {
    const name = entity.name ? entity.name : entity.type
    mud.addHistory(name + " took damage")
  })
  
  bot.on("entityTamed", (entity: Entity) => {
    const name = entity.name ? entity.name : entity.type
    mud.addHistory(name + " was tamed")
  })

  bot.on("chestLidMove", (block: Block, isOpen: number, block2: Block | null) => {
    if (isOpen > 0) {
      mud.addHistory("A chest was open")
    }
  })

  bot.on("playerCollect", (collector: Entity, collected: Entity) => {
    if (collector.uuid == bot.entity.uuid) {
      const name = collected.name ? collected.name : collected.type
      mud.addHistory("You picked up " + name)
    }
  })

  
  setTimeout(displayTimeOut, 10)
  term.input.startListening()
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
  // log("Recieved input: " + d)
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

const displayTimeOut = () => {
  loadBlocks(mud,mud.grid, mud.gridC)
  showDisplay(mud)
  setTimeout(displayTimeOut, 115)
}


