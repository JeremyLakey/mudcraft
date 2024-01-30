const loadBlocks = require("./loadblocks.js");

const term = require("node-terminal-tools")
const output = term.output

const standard = require("./displays/standard/standard.js")
const inventory = require("./displays/inventory/inventory.js")

const States = require("../model/enums/state.js");
const DisplayState = States.DisplayState

const showDisplay = (model) => {

    let display;
    switch (model.State) {
        case DisplayState.Base:
            display = standard.getStandardDisplay(model);
            break;
        case DisplayState.Inventory:
            display = inventory.getInventoryDisplay(model);
    }
    renderDisplay(display)
}

const renderDisplay = (display) => {
    for (let i = 0; i < display.length; i++) {
        output.write(i, display[i])
    }
    for (let i = display.length; i < output.height; i++) {
        output.write(i, "")
    }
}

module.exports = {showDisplay};