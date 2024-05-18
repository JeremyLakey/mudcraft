import Mud from "../model/mud"

const movement = require("./movement.js");
const states = require("../model/enums/state.js")
const DisplayStates = states.DisplayState
const view = require("./view.js")

const doCommand = (model, chat) => {
    if (chat == "quit") {
        process.exit(1)
    }
    if (model.displayState == DisplayStates.Base && movement.movementCommands(model.bot, chat)) return;

    // No view based commands
    if (view.viewCommands(model, chat)) return;
    model.bot.chat(chat)
}

module.exports = {doCommand};