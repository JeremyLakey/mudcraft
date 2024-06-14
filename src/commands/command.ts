import Mud from "../model/mud.js"

import movementCommands from "./movement.js"
import actionCommands from "./action.js"
import DisplayState from "../model/enums/display-state.js"
import viewCommands from "./view.js"
import utilCommands from "./util.js"

const doCommand = (model: Mud, chat: string) => {
    if (chat == "quit") {
        process.exit(1)
    }
    
    if (model.displayState == DisplayState.Base && (movementCommands(model, chat) || actionCommands(model, chat))) return;
    if (model.displayState == DisplayState.Inventory)
    // No view based commands
    if (viewCommands(model, chat)) return;
    if (utilCommands(model, chat)) return;
}

export default doCommand;