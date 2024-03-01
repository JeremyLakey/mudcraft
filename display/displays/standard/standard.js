const term = require("node-terminal-tools")
const settings = require("../../../settings.json")
const output = term.output

const utils = require("../utils/utils")

const health = "Health: ";
const showHealthBar = (model, r) => {
    for (let i = 0; i < health.length; i++) {
        model.updateDisplay(i, r, health[i])
    }
    
    model.updateColor(1)
    for (let i = health.length; i < model.bot.health + health.length; i++) {
        model.updateDisplay(i, r, '❤')
    }
    model.updateColor(0)

    model.clearRestOfRow()
}

const food = "Hunger: "
const showFoodBar = (model, r) => {
    for (let i = 0; i < food.length; i++) {
        model.updateDisplay(i, r, food[i])
    }
    
    model.updateColor(2)
    for (let i = food.length; i < model.bot.food + food.length; i++) {
        model.updateDisplay(i, r, '#')
    }
    model.updateColor(0)

    model.clearRestOfRow()
}


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

const command = ": "
const showCommand = (model, r) => {
    for (let i = 0; i < command.length; i++) {
        model.updateDisplay(i, r, command[i])
    }
    
    for (let i = 0; i < model.currentMessage.length; i++) {
        model.updateDisplay(i + command.length, r, model.currentMessage[i])
    }

    model.clearRestOfRow()
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
    showHealthBar(model, 0)
    showFoodBar(model, 1)

    model.clearRow(2)

    let r = showMapRows(model, 3) + 2
    
    model.clearRow(r + 1)

    showCommand(model, r + 2)

    model.clearRow(r + 3)

    utils.addEvents(model, r + 4, settings["max-events-display"], 0)
}

module.exports = {showStandardDisplay}

