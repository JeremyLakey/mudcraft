import HistoryEventType from "../model/enums/event-types"
import Mud from "../model/mud"

const inventoryCommands = (model:Mud, chat:string) => {
    const chats: string[] = chat.split(" ")
    switch(chats[0]) {
        case "north":
        case "up":
            model.inventoryOffSet += 5
            if (model.inventoryOffSet > model.bot.inventory.slots.length) model.inventoryOffSet += 5 
            return true

        case "south":
        case "down":

            model.inventoryOffSet -= 5
        
            if (model.inventoryOffSet < 0) model.inventoryOffSet = 0 
            return false

        case "drop":
            if (chats.length === 2) {
                //model.bot.tossStack(chats[1])
            }
            else if (chats.length === 3) {
                //model.bot.toss(chats[1], null, chats[2])
            }
            else {
                // add event that failed to drop 
                model.addHistory("Missing item, could not drop", HistoryEventType.Failure)
            }
        default:
            return false
        }
}


export default inventoryCommands