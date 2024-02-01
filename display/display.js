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
    switch (model.displayState) {
        case DisplayState.Base:
            standard.showStandardDisplay(model);
            break;
        case DisplayState.Inventory:
            inventory.getInventoryDisplay(model);
            break;
        default:
            break;
    }
}

initDisplay();

module.exports = {showDisplay};