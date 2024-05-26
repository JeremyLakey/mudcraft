import Mud from "../../model/mud"
import { Bot } from "mineflayer"
import { Block } from 'prismarine-block'
import { Vec3 } from 'vec3';

import DirectionState from "../../model/enums/direction-state"
import HistoryEventType from "../../model/enums/event-types";

const maybeDig = (pos: Vec3, model: Mud): boolean => {
    let block = model.bot.blockAt(pos)
    if (block && block.diggable && model.bot.canSeeBlock(block)) {
        model.addHistory("Digging " + block.name, HistoryEventType.Digging)
        model.lastDigging = block.name
        model.bot.dig(block)
        return true;
    } 
   return false
}

const digColumn = (x, z, model: Mud) => {
    let y = model.bot.entity.position.y
    if (!maybeDig(new Vec3(x, y, z), model)) {
        if (!maybeDig(new Vec3(x, 1 + y, z), model)) {
            maybeDig(new Vec3(x, -1 + y, z), model)
        }
    }
}



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
    let block: Block = bot.blockAt(pos)

    switch(direction) {
        case DirectionState.North:
            digColumn(pos.x, pos.z - 1, model)
            return true

        case DirectionState.East:
            digColumn(pos.x + 1, pos.z, model)
            return true

        case DirectionState.South:
            digColumn(pos.x, pos.z + 1, model)
            return true

        case DirectionState.West:
            digColumn(pos.x - 1, pos.z, model)
            return true

        case DirectionState.Down:
            if (!maybeDig(new Vec3(0 + pos.x, pos.y - 1, 0 + pos.z), model)) {
                if (!maybeDig(new Vec3(0 + pos.x, pos.y - 2, 0 + pos.z), model)) {
                    maybeDig(new Vec3(0 + pos.x, pos.y - 3, 0 + pos.z), model)
                }
            }
            return true

        case DirectionState.Up:
            if (!maybeDig(new Vec3(0 + pos.x, 1 + pos.y, 0 + pos.z), model)) {
                if (!maybeDig(new Vec3(0 + pos.x, 2 + pos.y, 0 + pos.z), model)) {
                    if (!maybeDig(new Vec3(0 + pos.x, 3 + pos.y, 0 + pos.z), model)) {
                        if (!maybeDig(new Vec3(0 + pos.x, 4 + pos.y, 0 + pos.z), model)) {
                            maybeDig(new Vec3(0 + pos.x, 5 + pos.y, 0 + pos.z), model)
                        }
                    }
                }
            }
            return true
        
        default:
            return false
    }
}

export default digBlock