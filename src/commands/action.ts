import Mud from "../model/mud"
import { Bot } from "mineflayer"
import { Vec3 } from 'vec3';

import digBlock from "./actions/dig"
import maybeAttack from "./actions/attack"


const actionCommands = (model:Mud, chat:string) => {
    const chats: string[] = chat.split(" ")
    switch(chats[0]) {
        case "attack":
            maybeAttack(model, chats[1])
            return true

        case "dig":
            digBlock(model, chats[1])
            return true
        case "look":
            if (chats.length == 1) {
                model.lookUp = !model.lookUp
                return true
            }
            if (chats[1] == 'up' || chats[1] == 'u') {
                model.lookUp = true
                return true
            }
            if (chats[1] == 'down' || chats[1] == 'd') {
                model.lookUp = false
                return true
            }

        default:
            return false
        }
}


export default actionCommands