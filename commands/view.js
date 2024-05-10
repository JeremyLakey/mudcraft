const states = require("../model/enums/state")
const displayStates = states.DisplayState

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
        case "h":
        case "help":
        case "?":
            model.displayState = displayStates.Help
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