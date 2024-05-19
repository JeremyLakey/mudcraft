import { Bot } from "mineflayer"

const settings = require('../settings.json')
const {getDepth} = require('./displays/utils/color.js')
const {mapName} = require('./displays/utils/blockMap.js')


const loadLayer = (bot: Bot, yOffset: number, grid: String[][], gridC: number[][]): void => {
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

const setLayer = (grid: String[][], gridC: number[][]): void => {
    for (let j = -settings.distance; j <= settings.distance; j++) {
        for (let i = -settings.distance; i <= settings.distance; i++) {
            grid[j + settings.distance][i + settings.distance] = " "
            gridC[j + settings.distance][i + settings.distance] = 0
        }
    }
}

const loadBlocks = (bot: Bot, grid: String[][], gridC: number[][]): void => {
    setLayer(grid, gridC)
    loadLayer(bot, -3, grid, gridC);
    loadLayer(bot, -2, grid, gridC);
    loadLayer(bot, -1, grid, gridC);
    loadLayer(bot, 0, grid, gridC);
    loadLayer(bot, 1, grid, gridC);
    loadLayer(bot, 2, grid, gridC);
    grid[settings.distance][settings.distance] = '@'
    gridC[settings.distance][settings.distance] = 2
}

export default loadBlocks