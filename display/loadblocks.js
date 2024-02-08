
const settings = require('../settings.json')


const loadLayer = (bot, yOffset, c, grid) => {
    if (!bot.entity ) {
        return 
    }
    for (let j = -settings.distance; j <= settings.distance; j++) {
        for (let i = -settings.distance; i <= settings.distance; i++) {
            let temp = bot.blockAt(bot.entity.position.offset(i, yOffset, j))
            if (temp && temp.name != 'air') {
                grid[j + settings.distance][i + settings.distance] = c
            }
        }
    }
}

const loadBlocks = (bot, grid) => {
    loadLayer(bot, -2, ".", grid);
    loadLayer(bot, -1, "_", grid);
    loadLayer(bot, 0, "□", grid);
    loadLayer(bot, 1, "#", grid);
    loadLayer(bot, 2, "X", grid);
    grid[settings.distance][settings.distance] = '@'
}

module.exports = {loadBlocks};