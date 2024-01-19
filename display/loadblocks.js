
const settings = require('../settings.json')


const loadLayer = (bot, yOffset, c, grid) => {
    for (let j = -settings.distance; j <= settings.distance; j++) {
        for (let i = -settings.distance; i <= settings.dimension.w; i++) {

        }
    }
}

const loadBlocks = (bot, grid) => {
    bot.blockAt(block.offset(0, 1, 0)).name === 'air'

    loadLayer(bot, -2, ".", grid);
    loadLayer(bot, -1, "_", grid);
    loadLayer(bot, 0, "□", grid);
    loadLayer(bot, 1, "#", grid);
    loadLayer(bot, 2, "X", grid);
}

modal.exports = {loadBlocks};