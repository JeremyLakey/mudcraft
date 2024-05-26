
import Mud from '../model/mud.js'
import { Bot } from "mineflayer"

import * as settings from '../settings.json'
import { getDepth } from './displays/utils/color.js'

import mapName from './displays/utils/blockMap'
import loadEntites from './displays/entities/loadentities'


const loadLayer = (bot: Bot, yOffset: number, grid: string[][], gridC: number[][]): void => {
    if (!bot.entity ) {
        return 
    }
    for (let j = -settings.distance; j <= settings.distance; j++) {
        for (let i = -settings.distance; i <= settings.distance; i++) {
            let temp = bot.blockAt(bot.entity.position.offset(i, yOffset, j))
            if (temp) {
                if (temp.name == 'air') continue // Going to implement light eventually to get this working
                grid[j + settings.distance][i + settings.distance] = mapName(temp.name)
                gridC[j + settings.distance][i + settings.distance] = getDepth(yOffset)
            }
        }
    }
}

const setLayer = (grid: string[][], gridC: number[][]): void => {
    for (let j = -settings.distance; j <= settings.distance; j++) {
        for (let i = -settings.distance; i <= settings.distance; i++) {
            grid[j + settings.distance][i + settings.distance] = " "
            gridC[j + settings.distance][i + settings.distance] = 0
        }
    }
}

const loadBlocks = (model: Mud, grid: string[][], gridC: number[][]): void => {
    setLayer(grid, gridC);
    
    if (model.lookUp) {
        loadLayer(model.bot, 0, grid, gridC);
        loadLayer(model.bot, 1, grid, gridC);
        loadLayer(model.bot, 2, grid, gridC);
        loadLayer(model.bot, 3, grid, gridC);
        loadLayer(model.bot, 4, grid, gridC);
    }
    else {
        loadLayer(model.bot, -3, grid, gridC);
        loadLayer(model.bot, -2, grid, gridC);
        loadLayer(model.bot, -1, grid, gridC);
        loadLayer(model.bot, 0, grid, gridC);
        loadLayer(model.bot, 1, grid, gridC);
    }
    loadEntites(model.bot, grid, gridC);
    grid[settings.distance][settings.distance] = '@'
    gridC[settings.distance][settings.distance] = 2
}

export default loadBlocks