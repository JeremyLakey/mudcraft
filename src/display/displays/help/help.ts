import Mud from "../../../model/mud"
const term = require("node-terminal-tools")
const settings = require("../../../settings.json")

const utils = require("../utils/utils")

const showStandardDisplay = (model: Mud) => {
    /*
    
    List of commands


    :
    */
   
    utils.showCommand(model, 0)
}

export default showStandardDisplay

