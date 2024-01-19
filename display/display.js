const loadBlocks = require("./loadblocks.js");
const States = require("../model/enums/state.js");
const DisplayState = States.DisplayState

const showDisplay = (bot, model) => {
    console.clear();
    
    switch (model.State) {
        case DisplayState.Base:
            showStandardDisplay();

        case DisplayState.Inventory:
    }
}

const showStandardDisplay = (bot, model) => {
/*
XXXXX
XXpXX
XXXXX

Health: ##########
Food:   ##########
*/


}

const showInventory = (bot, model) => {

}

module.exports = {showDisplay};