
import Mud from "../../model/mud"
import { Entity } from 'prismarine-entity'

const ATTACK_RANGE = 5

const getEntityName = (ent: Entity): string => {
    if(ent.name) return ent.name
    if(ent.username) return ent.username;
    return ent.displayName
}

const maybeAttack = ( model:Mud, targetName: string | undefined) => {

    let bot = model.bot
    let target: Entity | undefined = undefined;
    let entityKeys = Object.keys(bot.entities)
    for (let i = 0; i < entityKeys.length; i++) {
        
        let curEnt = bot.entities[entityKeys[i]]
        
        if (bot.entity.id != curEnt.id) { continue }

        let entName = getEntityName(bot.entities[entityKeys[i]]);
        
        if (target) {
            if (getEntityName(target) == targetName) {
                // current target has right name, only replace if new entity has right name and is closer
                if (entName == targetName && bot.entity.position.distanceTo(curEnt.position) < bot.entity.position.distanceTo(target.position)) {
                    target = curEnt
                }
            }
            else {
                // our current target doesn't have the current name, but we found an entity that does
                if (entName == targetName && bot.entity.position.distanceTo(curEnt.position) < ATTACK_RANGE) target = curEnt
                // neither have the right name, attack closest hostile mob
                else if ((curEnt.kind && curEnt.kind == 'hostile') && bot.entity.position.distanceTo(curEnt.position) < bot.entity.position.distanceTo(target.position)) {
                    target = curEnt
                }
            }
        }
        else {
            // update with either the closest correct name or hostile mob
            if (((curEnt.kind && curEnt.kind == 'hostile') || entName == targetName) && bot.entity.position.distanceTo(curEnt.position) < ATTACK_RANGE) {
                target = curEnt
            }
        }
        
    }

    if (target) model.bot.attack(target)
}