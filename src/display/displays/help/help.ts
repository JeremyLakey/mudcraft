import Mud from "../../../model/mud"


import {
    showCommand,
    showHealthBar,
    showFoodBar
} from "../utils/utils"

const helpLines = [
    "Replace <direction> with a direction",
    "\"north\", \"west\", \"south\", \"east\", \"up\", \"down\" are the possible directions for commands.",
    "\n",
    "dig <direction>",
    "attack <mob>: Attack nearby mob",
]


const showStandardDisplay = (model: Mud) => {
    /*
    
    List of commands


    :
    */
    showHealthBar(model, 0) 
    showFoodBar(model, 1)
    model.clearRow(2)
    showCommand(model, 3)

}

export default showStandardDisplay

