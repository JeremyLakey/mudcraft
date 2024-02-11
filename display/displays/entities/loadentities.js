const settings = require("../../../settings.json")

const getEntityColor = (kind) => {
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

const getEntityCharacter = (name) => {
    switch(name) {
        case "player":
            return "@"
        default:
            return "$"
    }
}

const getBotOffSet = (bot, entity) => {
    let x = settings.distance - Math.floor(entity.position.x - bot.entity.position.x - .5)
    let y = Math.abs(entity.position.y - bot.entity.position.y)
    let z = settings.distance - Math.floor(entity.position.z - bot.entity.position.z - .5)
}

const loadEntites = (bot, grid, gridC) => {
    for (let e = 0; e < bot.entities.length; e++) {
        let ent = bot.entities[e]
        let loc = getBotOffSet(bot, ent)
        if (loc.x >= 0 && loc.x < grid[0] && loc.y >= 0 && loc.y < grid[0]) {
            grid[loc.x][loc.y] = getEntityCharacter(ent.name)
            gridC[loc.x][loc.y] = getEntityColor(ent.kind)
        }
    }
}


module.exports = {loadEntites}