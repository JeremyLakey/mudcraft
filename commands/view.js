const states = require("../model/enums/state")
const displayStates = states.DisplayState
const term = require("node-terminal-tools")
const output = term.output

const resetScreen = (model) => {

    output.clear()
    model.setupCache(output.width, output.height)
}

const viewCommands = (model, chat) => {
    switch(chat) {
        case "bag":
        case "inv":
        case "inventory":
            model.displayState = displayStates.Inventory
            resetScreen(model)
            return true
        case "world":
        case "map":
        case "back":
        case "default":
            model.displayState = displayStates.Base
            resetScreen(model)
            return true
        }
}


module.exports = {viewCommands}