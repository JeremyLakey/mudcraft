
const settings = require('../settings.json')
const {getDepth} = require('./displays/utils/color.js')
const {mapName} = require('./blocks/blockMap')


const loadLayer = (bot, yOffset, grid, gridC) => {
    if (!bot.entity ) {
        return 
    }
    for (let j = -settings.distance; j <= settings.distance; j++) {
        for (let i = -settings.distance; i <= settings.distance; i++) {
            let temp = bot.blockAt(bot.entity.position.offset(i, yOffset, j))
            if (temp) {
                if (temp.name == 'air') continue
                grid[j + settings.distance][i + settings.distance] = mapName(temp.name)
                gridC[j + settings.distance][i + settings.distance] = getDepth(yOffset)
            }
        }
    }
}

const setLayer = (grid, gridC) => {
    for (let j = -settings.distance; j <= settings.distance; j++) {
        for (let i = -settings.distance; i <= settings.distance; i++) {
            grid[j + settings.distance][i + settings.distance] = " "
            gridC[j + settings.distance][i + settings.distance] = 0
        }
    }
}

const loadBlocks = (bot, grid, gridC) => {
    setLayer(grid, gridC)
    loadLayer(bot, -2, grid, gridC);
    loadLayer(bot, -1, grid, gridC);
    loadLayer(bot, 0, grid, gridC);
    loadLayer(bot, 1, grid, gridC);
    loadLayer(bot, 2, grid, gridC);
    grid[settings.distance][settings.distance] = '@'
    gridC[settings.distance][settings.distance] = 2
}

module.exports = {loadBlocks};