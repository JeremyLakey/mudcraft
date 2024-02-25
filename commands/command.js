const movement = require("./movement.js");


const doCommand = (model, chat) => {
    if (chat == "quit") {
        process.exit(1)
    }
    if (movement.movementCommands(model.bot, chat)) return;
    model.bot.chat(chat)
}

module.exports = {doCommand};