import Mud from "../model/mud"
import HistoryEventType from "../model/enums/event-types"
import { Bot } from "mineflayer"
import { Entity } from 'prismarine-entity'

const labelMobs = (model:Mud) => {
    const keys = Object.keys(model.bot.entities)
    const counts = {}
    for (let e: number = 0; e < keys.length; e++) {
        let ent: Entity = model.bot.entities[keys[e]]
        if (ent.mobType) { 
            if (counts[ent.mobType]) {
                counts[ent.mobType] += 1
            }
            else {
                counts[ent.mobType] = 1
            }
        }
    }

    const keys2 = Object.keys(counts)
    for (let e: number = 0; e < keys2.length; e++) {
        let count = counts[keys2[e]]
        model.addHistory(count + " " + keys2[e], HistoryEventType.CountMobs)
    }
}

const utilCommands = (model:Mud, chat:string) => {
    const chats: string[] = chat.split(" ")
    switch(chats[0]) {
        case "clear":
            model.clearVisibleHistory();
            return true
        case "mobs":
            labelMobs(model)
            return true
        default:
            return false
        }
}


export default utilCommands