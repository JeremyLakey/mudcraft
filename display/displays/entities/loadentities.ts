import { Bot } from "mineflayer"
import { Entity } from 'prismarine-entity'

const settings = require("../../../settings.json")

const getEntityColor = (kind: String | undefined): number => {
    switch(kind) {
        case 'player':
            return 8
        case 'hostile':
            return 1;
        case 'mob':

        case 'passive':
        case 'animal':
            return 2;
        case 'other':
        default:
            return 0
    }
}

const getEntityCharacter = (name: String | undefined): String => {
    switch(name) {
        case "player":
            return "@"
        default:
            return "$"
    }
}

const getBotOffSet = (bot: Bot, entity: Entity): {x:number, y:number, z:number} => {
    let x = settings.distance - Math.floor(entity.position.x - bot.entity.position.x - .5)
    let y = Math.abs(entity.position.y - bot.entity.position.y)
    let z = settings.distance - Math.floor(entity.position.z - bot.entity.position.z - .5)
    return {x, y, z}
}

const loadEntites = (bot: Bot, grid:String[][] , gridC: number[][]): void => {
    const keys = Object.keys(bot.entities)
    for (let e: number = 0; e < keys.length; e++) {
        let ent: Entity = bot.entities[keys[e]]
        let loc = getBotOffSet(bot, ent)
        if (loc.x >= 0 && loc.x < grid[0].length && loc.y >= 0 && loc.y < grid[0].length) {
            grid[loc.x][loc.y] = getEntityCharacter(ent.name)
            gridC[loc.x][loc.y] = getEntityColor(ent.kind)
        }
    }
}


export default loadEntites