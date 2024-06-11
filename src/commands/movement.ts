import DirectionState from "../model/enums/direction-state";
import Mud from "../model/mud"
import { Bot } from "mineflayer"

var canMove = true;

const movementTimeout = () => {
    canMove = false
    setTimeout(() => {
        canMove = true
    }, 150)
}

const attemptJump = (bot: Bot, x: number, y: number, z: number) => {
    let temp = bot.blockAt(bot.entity.position.offset(x, y, z))
    
    if (temp && temp.name !== 'air') {
        bot.entity.position.y = 1 + bot.entity.position.y
    }
}

const movementCommands = (model: Mud, chat: string) => {
    const bot = model.bot
    bot.entity.position.y = .1 + bot.entity.position.y
    switch (chat) {
        case "jump":
        case "j":
        case "up":
        case "u":
            if (!canMove) return true;
            bot.entity.position.y = 1.25 + Math.floor(bot.entity.position.y)
            if (bot.entity.position)
            movementTimeout()
            model.direction = DirectionState.Up
            return true

        // jump north
        case "up north":
        case "u north":
        case "jump north":
        case "j north":
        case "up w":
        case "u w":
        case "jump w":
        case "j w":
            // implement jump movements
            return false
        
        // jump west
        case "up west":
        case "u west":
        case "jump west":
        case "j west":
        case "up a":
        case "u a":
        case "jump a":
        case "j a":
            // implement jump movements
            return false
            
        // jump south
        case "up south":
        case "u south":
        case "jump south":
        case "j south":
        case "up s":
        case "u s":
        case "jump s":
        case "j s":
            // implement jump movements
            return false
            
        case "up north":
        case "u north":
        case "jump north":
        case "j north":
        case "up w":
        case "u w":
        case "jump w":
        case "j w":
            // implement jump movements
            return false

        case "north":
        case "w":
            if (!canMove) return true;
            bot.look(0, bot.entity.pitch, true)
            bot.entity.position.z = Math.floor(bot.entity.position.z) - .5
            attemptJump(bot, 0, 0, 0)
            movementTimeout()
            model.direction = DirectionState.North
            return true
        
        case "west":
        case "a":
            if (!canMove) return true;
            bot.look(Math.PI * .5, bot.entity.pitch, true)
            bot.entity.position.x = Math.floor(bot.entity.position.x) - .5
            attemptJump(bot, 0, 0, 0)
            movementTimeout()
            model.direction = DirectionState.West
            return true

        case "south":
        case "s":
            if (!canMove) return true;
            bot.look(Math.PI, bot.entity.pitch, true)
            bot.entity.position.z = 1.5 + Math.floor(bot.entity.position.z)
            attemptJump(bot, 0, 0, 0)
            movementTimeout()
            model.direction = DirectionState.South
            return true

        case "east":
        case "d":
            if (!canMove) return true;
            bot.look(Math.PI * 1.5, bot.entity.pitch, true)
            bot.entity.position.x = 1.5 + Math.floor(bot.entity.position.x)
            attemptJump(bot, 0, 0, 0)
            movementTimeout()
            model.direction = DirectionState.East
            return true
        
        case "down":
            if (!canMove) return true;
            bot.entity.position.y = bot.entity.position.y = -1 + Math.floor(bot.entity.position.y)
            movementTimeout()
            model.direction = DirectionState.Down
            return true
    }
    return false;
}


export default movementCommands