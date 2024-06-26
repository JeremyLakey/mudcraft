import {
    addHistory,
    showCommand,
    showHealthBar,
    showFoodBar
} from "../utils/utils"
import Mud from "../../../model/mud"

const term = require("node-terminal-tools")
const settings = require("../../../settings.json")




const showMapRows = (model: Mud, r: number): number => {
    let temp = 0
    for (let i = 0; i < model.grid.length; i++) {
        for (let j = 0; j < model.grid[0].length; j++) {
            model.updateColor(model.gridC[i][j])
            model.updateDisplay(j, i + r, model.grid[i][j])
        }
        temp++
    }
    model.updateColor(0)

    return temp
}

const showStandardDisplay = (model: Mud): void => {
    /*
    Health: ##########
    Food:   ##########

    XXXXX
    XXpXX
    XXXXX

    :

    ****Event 1****
    ****Event 2****
    ****Event 3****


    */
    showHealthBar(model, 0)
    showFoodBar(model, 1)

    model.clearRow(2)

    let r = showMapRows(model, 3) + 2
    
    model.clearRow(r + 1)

    showCommand(model, r + 2)

    model.clearRow(r + 3)

    addHistory(model, r + 4, settings["max-events-display"], 0)
}

export default showStandardDisplay

