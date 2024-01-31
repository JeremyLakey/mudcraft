const loadBlocks = require("./loadblocks.js");

const term = require("node-terminal-tools")
const output = term.output

const standard = require("./displays/standard/standard.js")
const inventory = require("./displays/inventory/inventory.js")

const States = require("../model/enums/state.js");
const DisplayState = States.DisplayState

const initDisplay = () => {
    output.clear()
}

const showDisplay = (model) => {

    let display;
    switch (model.displayState) {
        case DisplayState.Base:
            display = standard.getStandardDisplay(model);
            break;
        case DisplayState.Inventory:
            display = inventory.getInventoryDisplay(model);
            break;
        default:
            display = []
    }

    renderDisplay(display)
}

const renderDisplay = (display) => {
    if (display) {
        for (let i = 0; i < display.length; i++) {
            output.writeUnsafe(i, display[i])
        }
        for (let i = display.length; i < output.height; i++) {
            output.writeUnsafe(i, "")
        }
    }
    
}

initDisplay();

module.exports = {showDisplay};