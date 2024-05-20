import Mud from "../model/mud"

import movementCommands from "./movement.js"
import DisplayState from "../model/enums/display-state"
import viewCommands from "./view"

const doCommand = (model: Mud, chat: string) => {
    if (chat == "quit") {
        process.exit(1)
    }
    
    if (model.displayState == DisplayState.Base && movementCommands(model.bot, chat)) return;

    // No view based commands
    if (viewCommands(model, chat)) return;
}

export default doCommand;