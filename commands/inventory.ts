import Mud from "../model/mud"

const viewCommands = (model:Mud, chat:string) => {
    const chats: string[] = chat.split(" ")
    switch(chats[0]) {
        case "drop":
            if (chats.length === 2) {
                model.bot.tossStack(chats[1])
            }
            else if (chats.length === 3) {
                model.bot.toss(chats[1], null, chats[2])
            }
            else {
                // add event that failed to drop 
                model.events.unshift("Missing item, could not drop")
            }
        default:
            return false
        }
}


export default viewCommands