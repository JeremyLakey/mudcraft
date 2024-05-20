import { Bot } from "mineflayer"
import { Entity } from 'prismarine-entity'

const settings = require("../../../settings.json")

const getEntityColor = (kind: String | undefined): number => {
    if (!kind) return 0
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

const getEntityCharacter = (name: String | undefined): string => {
    if (!name) return "$"
    switch(name) {
        case "player":
            return "@"
        default:
            return "$"
    }
}

const getBotOffSet = (bot: Bot, entity: Entity): {x:number, y:number, z:number} => {
    let x = settings.distance - Math.floor(bot.entity.position.x - entity.position.x + .5)
    let y = Math.abs(entity.position.y - bot.entity.position.y)
    let z = settings.distance - Math.floor(bot.entity.position.z - entity.position.z + .5)
    return {x, y, z}
}

const loadEntites = (bot: Bot, grid:string[][] , gridC: number[][]): void => {
    const keys = Object.keys(bot.entities)
    for (let e: number = 0; e < keys.length; e++) {
        let ent: Entity = bot.entities[keys[e]]
        let loc = getBotOffSet(bot, ent)
        if (loc.x >= 0 && loc.x < grid[0].length && loc.z >= 0 && loc.z < grid[0].length) {
            grid[loc.z][loc.x] = getEntityCharacter(ent.name)
            gridC[loc.z][loc.x] = getEntityColor(ent.kind)
        }
    }
}


export default loadEntites