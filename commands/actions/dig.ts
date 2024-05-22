import Mud from "../../model/mud"
import { Bot } from "mineflayer"
import { Vec3 } from 'vec3';

import DirectionState from "../../model/enums/direction-state"

const digBlock = (model: Mud, direction: string | undefined) => {
    if (!direction) {
        direction = model.direction
    }
    if (!direction) return

    // other short hands
    if (direction == "n") direction = DirectionState.North
    if (direction == "e") direction = DirectionState.East
    if (direction == "s") direction = DirectionState.South
    if (direction == "w") direction = DirectionState.West
    if (direction == "d") direction = DirectionState.Down
    if (direction == "u") direction = DirectionState.Up

    const bot: Bot = model.bot
    let pos = bot.entity.position
    let block1 = undefined
    let block2 = undefined
    let block3 = undefined

    switch(direction) {
        case DirectionState.North:
            pos = new Vec3(0 + pos.x, pos.y, -1 + pos.z)
            block1 = bot.blockAt(bot.entity.position)
            if (block1 && block1.name != "air") {
                bot.dig(block1)
            }
            else {
                pos = new Vec3(0 + pos.x, 1 + pos.y, -1 + pos.z)
                block2 = bot.blockAt(bot.entity.position)
                if (block2 && block2.name != "air") {
                    bot.dig(block2)
                }
            }


        case DirectionState.East:
            pos = new Vec3(1 + pos.x, pos.y, 0 + pos.z)
            block1 = bot.blockAt(bot.entity.position)
            if (block1 && block1.name != "air") {
                bot.dig(block1)
            }
            else {
                pos = new Vec3(1 + pos.x, 1 + pos.y, 0 + pos.z)
                block2 = bot.blockAt(bot.entity.position)
                if (block2 && block2.name != "air") {
                    bot.dig(block2)
                }
            }

        case DirectionState.South:
            pos = new Vec3(0 + pos.x, pos.y, 1 + pos.z)
            block1 = bot.blockAt(bot.entity.position)
            if (block1 && block1.name != "air") {
                bot.dig(block1)
            }
            else {
                pos = new Vec3(0 + pos.x, 1+ pos.y, 1 + pos.z)
                block2 = bot.blockAt(bot.entity.position)
                if (block2 && block2.name != "air") {
                    bot.dig(block2)
                }
            }

        case DirectionState.West:
            pos = new Vec3(-1 + pos.x, pos.y, 0 + pos.z)
            block1 = bot.blockAt(bot.entity.position)
            if (block1 && block1.name != "air") {
                bot.dig(block1)
            }
            else {
                pos = new Vec3(-1 + pos.x, 1 + pos.y, 0 + pos.z)
                block2 = bot.blockAt(bot.entity.position)
                if (block2 && block2.name != "air") {
                    bot.dig(block2)
                }
            }

        case DirectionState.Down:
            pos = new Vec3(0 + pos.x, pos.y - 1, 0 + pos.z)
            block1 = bot.blockAt(bot.entity.position)
            if (block1 && block1.name != "air") {
                bot.dig(block1)
            }
            else {
                pos = new Vec3(0 + pos.x, pos.y - 2, 0 + pos.z)
                block2 = bot.blockAt(bot.entity.position)
                if (block2 && block2.name != "air") {
                    bot.dig(block2)
                }
                else {
                    pos = new Vec3(0 + pos.x, pos.y - 3, 0 + pos.z)
                    block3 = bot.blockAt(bot.entity.position)
                    if (block3 && block3.name != "air") {
                        bot.dig(block3)
                    }
                }
            }
            return;

        case DirectionState.Up:
            pos = new Vec3(0 + pos.x, 1 + pos.y, 0 + pos.z)
            block1 = bot.blockAt(bot.entity.position)
            if (block1 && block1.name != "air") {
                bot.dig(block1)
            }
            else {
                pos = new Vec3(0 + pos.x, 2 + pos.y, 0 + pos.z)
                block2 = bot.blockAt(bot.entity.position)
                if (block2 && block2.name != "air") {
                    bot.dig(block2)
                }
                else {
                    pos = new Vec3(0 + pos.x, 3 + pos.y, 0 + pos.z)
                    block3 = bot.blockAt(bot.entity.position)
                    if (block3 && block3.name != "air") {
                        bot.dig(block3)
                    }
                }
            }
            return;
        
        default:
            return
    }
}

export default digBlock