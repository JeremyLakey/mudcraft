import Mud from "../model/mud.js"

import movementCommands from "./movement.js"
import actionCommands from "./action.js"
import inventoryCommands from "./inventory.js"
import DisplayState from "../model/enums/display-state.js"
import viewCommands from "./view.js"
import utilCommands from "./util.js"
import {openLog, closeLog} from "../util/logging.js"
import helpCommands from "./help.js"

const doCommand = (model: Mud, chat: string) => {
    if (chat == "quit") {
        process.exit(1)
    }
    if (chat == "open log") {
        openLog();
    }
    if (chat == "close log") {
        closeLog()
    }
    
    if (model.displayState == DisplayState.Base && (movementCommands(model, chat) || actionCommands(model, chat))) return;
    if (model.displayState == DisplayState.Inventory && inventoryCommands(model, chat)) return;
    if (model.displayState == DisplayState.Help && helpCommands(model, chat)) return;
    // No view based commands
    if (viewCommands(model, chat)) return;
    if (utilCommands(model, chat)) return;
}

export default doCommand;