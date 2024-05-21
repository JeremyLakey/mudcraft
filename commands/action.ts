import Mud from "../model/mud"

const actionCommands = (model:Mud, chat:string) => {
    const chats: string[] = chat.split(" ")
    switch(chats[0]) {
        case "attack":
            return false;
        default:
            return false
        }
}


export default actionCommands