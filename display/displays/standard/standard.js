const term = require("node-terminal-tools")
const settings = require("../../../settings.json")

const utils = require("../utils/utils")


const showMapRows = (model, r) => {
    let temp = 0
    for (let i = 0; i < model.grid.length; i++) {
        for (let j = 0; j < model.grid[0].length; j++) {
            model.updateColor(model.gridC[i][j])
            model.updateDisplay(j, i + r, model.grid[i][j])
        }
        temp++
    }
    model.updateColor(0)

    return temp
}

const showStandardDisplay = (model) => {
    /*
    Health: ##########
    Food:   ##########

    XXXXX
    XXpXX
    XXXXX

    :

    ****Event 1****
    ****Event 2****
    ****Event 3****


    */
    utils.showHealthBar(model, 0)
    utils.showFoodBar(model, 1)

    model.clearRow(2)

    let r = showMapRows(model, 3) + 2
    
    model.clearRow(r + 1)

    utils.showCommand(model, r + 2)

    model.clearRow(r + 3)

    utils.addEvents(model, r + 4, settings["max-events-display"], 0)
}

module.exports = {showStandardDisplay}

