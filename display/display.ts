import Mud from '../model/mud.ts'
import DisplayState from "../model/enums/display-state.js"

const term = require("node-terminal-tools")
const output = term.output

const standard = require("./displays/standard/standard.js")
const inventory = require("./displays/inventory/inventory.js")


const initDisplay = () => {
    output.clear()
}

const showDisplay = (model: Mud): void => {
    process.stdout.cork()
    switch (model.displayState) {
        case DisplayState.Inventory:
            inventory.showInventoryDisplay(model);
            break;
        default:
        case DisplayState.Base:
            standard.showStandardDisplay(model);
            break;
    }
    process.stdout.uncork()
}

initDisplay()

export default showDisplay