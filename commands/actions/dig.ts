import Mud from "../../model/mud"
import { Bot } from "mineflayer"
import { Vec3 } from 'vec3';

import DirectionState from "../../model/enums/direction-state"
import HistoryEventType from "../../model/enums/event-types";

const digBlock = (model: Mud, direction: string | undefined) => {
    if (!direction) {
        direction = model.direction
    }
    direction = direction.toLowerCase();

    // other short hands
    if (direction == "n") direction = DirectionState.North
    if (direction == "e") direction = DirectionState.East
    if (direction == "s") direction = DirectionState.South
    if (direction == "w") direction = DirectionState.West
    if (direction == "d") direction = DirectionState.Down
    if (direction == "u") direction = DirectionState.Up

    const bot: Bot = model.bot
    let pos = bot.entity.position // maybe we need to floor this then add .5 depending on how the blockAt function works. Maybe the blocks are all on half axis for x/z axises
    let block1 = undefined
    let block2 = undefined
    let block3 = undefined

    switch(direction) {
        case DirectionState.North:
            model.addHistory("Digging north", HistoryEventType.Digging)
            pos = new Vec3(pos.x, pos.y, -1 + pos.z)
            block1 = bot.blockAt(pos)
            if (block1 && block1.name != "air") {
                
                model.addHistory("Digging " + block1.name, HistoryEventType.Digging)
                bot.dig(block1)
            }
            else {
                pos = new Vec3(0 + pos.x, 1 + pos.y, -1 + pos.z)
                block2 = bot.blockAt(pos)
                if (block2 && block2.name != "air") {
                    model.addHistory("Digging " + block2.name, HistoryEventType.Digging)
                    bot.dig(block2)
                }
            }
            return true


        case DirectionState.East:
            model.addHistory("Digging east", HistoryEventType.Digging)
            pos = new Vec3(1 + pos.x, pos.y, 0 + pos.z)
            block1 = bot.blockAt(pos)
            if (block1 && block1.name != "air") {
                model.addHistory("Digging " + block1.name, HistoryEventType.Digging)
                bot.dig(block1)
            }
            else {
                pos = new Vec3(1 + pos.x, 1 + pos.y, 0 + pos.z)
                block2 = bot.blockAt(pos)
                if (block2 && block2.name != "air") {
                    model.addHistory("Digging " + block2.name, HistoryEventType.Digging)
                    bot.dig(block2)
                }
            }
            
            return true

        case DirectionState.South:
            model.addHistory("Digging south", HistoryEventType.Digging)
            pos = new Vec3(0 + pos.x, pos.y, 1 + pos.z)
            block1 = bot.blockAt(pos)
            if (block1 && block1.name != "air") {
                model.addHistory("Digging " + block1.name, HistoryEventType.Digging)
                bot.dig(block1)
            }
            else {
                pos = new Vec3(0 + pos.x, 1+ pos.y, 1 + pos.z)
                block2 = bot.blockAt(pos)
                if (block2 && block2.name != "air") {
                    model.addHistory("Digging " + block2.name, HistoryEventType.Digging)
                    bot.dig(block2)
                }
            }
            return true

        case DirectionState.West:
            model.addHistory("Digging west", HistoryEventType.Digging)
            pos = new Vec3(-1 + pos.x, pos.y, 0 + pos.z)
            block1 = bot.blockAt(pos)
            if (block1 && block1.name != "air") {
                model.addHistory("Digging " + block1.name, HistoryEventType.Digging)
                bot.dig(block1)
            }
            else {
                pos = new Vec3(-1 + pos.x, 1 + pos.y, 0 + pos.z)
                block2 = bot.blockAt(pos)
                if (block2 && block2.name != "air") {
                    model.addHistory("Digging " + block2.name, HistoryEventType.Digging)
                    bot.dig(block2)
                }
            }
            return true

        case DirectionState.Down:
            model.addHistory("Digging down", HistoryEventType.Digging)
            pos = new Vec3(0 + pos.x, pos.y - 1, 0 + pos.z)
            block1 = bot.blockAt(pos)
            if (block1 && block1.name != "air") {
                model.addHistory("Digging " + block1.name, HistoryEventType.Digging)
                bot.dig(block1)
            }
            else {
                pos = new Vec3(0 + pos.x, pos.y - 2, 0 + pos.z)
                block2 = bot.blockAt(pos)
                if (block2 && block2.name != "air") {
                    model.addHistory("Digging " + block2.name, HistoryEventType.Digging)
                    bot.dig(block2)
                }
                else {
                    pos = new Vec3(0 + pos.x, pos.y - 3, 0 + pos.z)
                    block3 = bot.blockAt(pos)
                    if (block3 && block3.name != "air") {
                        model.addHistory("Digging " + block3.name, HistoryEventType.Digging)
                        bot.dig(block3)
                    }
                }
            }
            return true

        case DirectionState.Up:
            model.addHistory("Digging up", HistoryEventType.Digging)
            pos = new Vec3(0 + pos.x, 1 + pos.y, 0 + pos.z)
            block1 = bot.blockAt(pos)
            if (block1 && block1.name != "air") {
                model.addHistory("Digging " + block1.name, HistoryEventType.Digging)
                bot.dig(block1)
            }
            else {
                pos = new Vec3(0 + pos.x, 2 + pos.y, 0 + pos.z)
                block2 = bot.blockAt(pos)
                if (block2 && block2.name != "air") {
                    model.addHistory("Digging " + block2.name, HistoryEventType.Digging)
                    bot.dig(block2)
                }
                else {
                    pos = new Vec3(0 + pos.x, 3 + pos.y, 0 + pos.z)
                    block3 = bot.blockAt(pos)
                    if (block3 && block3.name != "air") {
                        model.addHistory("Digging " + block3.name, HistoryEventType.Digging)
                        bot.dig(block3)
                    }
                }
            }
            return true
        
        default:
            return false
    }
}

export default digBlock