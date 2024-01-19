const movement = require("./movement.js");


const doCommand = (bot, chat) => {
    if (chat == "quit") {
        process.exit(1);
    }
    movement.movementCommands(bot, chat);
}

module.exports = {doCommand};