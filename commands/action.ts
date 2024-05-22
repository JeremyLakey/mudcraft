import Mud from "../model/mud"
import { Bot } from "mineflayer"
import { Vec3 } from 'vec3';

import digBlock from "./actions/dig"


const actionCommands = (model:Mud, chat:string) => {
    const chats: string[] = chat.split(" ")
    switch(chats[0]) {
        case "attack":
            console.log("IMPLEMENT attack")
            return true

        case "dig":
            digBlock(model, chats[1].toLowerCase())
        default:
            return false
        }
}


export default actionCommands