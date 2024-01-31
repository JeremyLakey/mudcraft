
const settings = require('../settings.json')


const loadLayer = (bot, yOffset, c, grid) => {
    for (let j = -settings.gridN; j <= settings.gridN; j++) {
        for (let i = -settings.gridN; i <= settings.gridN; i++) {
            if (bot.blockAt(block.offset(j, yOffset, i)).name != 'air') {
                grid[j][i] = c
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
}

module.exports = {loadBlocks};