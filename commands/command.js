const movement = require("./movement.js");


const doCommand = (model, chat) => {
    if (chat == "quit") {
        process.exit(1);
    }
    movement.movementCommands(model.bot, chat);
}

module.exports = {doCommand};