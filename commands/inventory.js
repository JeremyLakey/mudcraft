

const viewCommands = (model, chat) => {
    const chats = chat.split(" ")
    switch(chat[0]) {
        case "drop":
            if (chats.lenght === 2) {
                model.bot.tossStack(chat[1])
            }
            else if (chats.lenght === 3) {
                model.bot.toss(chat[1], null, chat[2])
            }
            else {
                // add event that failed to drop 
                model.events.unshift("Missing item, could not drop")
            }
        default:
            return false
        }
}


module.exports = {viewCommands}