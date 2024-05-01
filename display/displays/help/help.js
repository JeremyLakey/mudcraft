const term = require("node-terminal-tools")
const settings = require("../../../settings.json")

const utils = require("../utils/utils")

const showStandardDisplay = (model) => {
    /*
    
    List of commands


    :
    */
   
    utils.showCommand(model, 0)
}

module.exports = {showStandardDisplay}

