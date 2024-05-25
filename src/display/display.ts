import Mud from '../model/mud.js'
import DisplayState from "../model/enums/display-state.js"

const term = require("node-terminal-tools")
const output = term.output

import showStandardDisplay from "./displays/standard/standard.js"
import showInventoryDisplay from "./displays/inventory/inventory.js"


const initDisplay = () => {
    output.clear()
}

const showDisplay = (model: Mud): void => {
    process.stdout.cork()
    switch (model.displayState) {
        case DisplayState.Inventory:
            showInventoryDisplay(model);
            break;
        default:
        case DisplayState.Base:
            showStandardDisplay(model);
            break;
    }
    process.stdout.uncork()
}

initDisplay()

export default showDisplay