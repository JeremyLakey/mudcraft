import HistoryEventType from "../model/enums/event-types"
import Mud from "../model/mud"

const HELP_OFF_SET_MAX = 20

const helpCommands = (model:Mud, chat:string) => {
    const chats: string[] = chat.split(" ")
    switch(chats[0]) {
        case "north":
        case "up":
            model.helpOffSet += 5
            if (model.helpOffSet > HELP_OFF_SET_MAX) model.inventoryOffSet = HELP_OFF_SET_MAX
            return true

        case "south":
        case "down":

            model.helpOffSet -= 5
        
            if (model.helpOffSet < 0) model.inventoryOffSet = 0 
            return false

        default:
            return false
        }
}


export default helpCommands