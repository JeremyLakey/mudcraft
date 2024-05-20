import Mud from "../model/mud"

const term = require("node-terminal-tools")
const output = term.output

import DisplayState from "../model/enums/display-state"

const resetScreen = (model) => {

    output.clear()
    model.setupCache(output.width, output.height)
}

const viewCommands = (model, chat) => {
    switch(chat) {
        case "bag":
        case "inv":
        case "inventory":
            model.displayState = DisplayState.Inventory
            resetScreen(model)
            return true
        case "h":
        case "help":
        case "?":
            model.displayState = DisplayState.Help
            resetScreen(model)
            return true
        case "world":
        case "map":
        case "back":
        case "default":
            model.displayState = DisplayState.Base
            resetScreen(model)
            return true
        }
}


export default viewCommands