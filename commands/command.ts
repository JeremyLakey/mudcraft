import Mud from "../model/mud"

import movementCommands from "./movement.js"
import actionCommands from "./action"
import DisplayState from "../model/enums/display-state"
import viewCommands from "./view"
import utilCommands from "./util"

const doCommand = (model: Mud, chat: string) => {
    if (chat == "quit") {
        process.exit(1)
    }
    
    if (model.displayState == DisplayState.Base && (movementCommands(model, chat) || actionCommands(model, chat))) return;
    // No view based commands
    if (viewCommands(model, chat)) return;
    if (utilCommands(model, chat)) return;
}

export default doCommand;