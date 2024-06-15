import Mud from "../../../model/mud"
import { Item } from 'prismarine-item'
import * as settings from '../../../settings.json'

import {
    showCommand,
    showHealthBar,
    showFoodBar
} from "../utils/utils"

const startItemIndex = 37


const displayItem = (model: Mud, item: Item | null, r: number) => {
    if (!item) {return}
    
    let tot = 0
    for (let j = 0; j < item.displayName.length; j++) {
        tot++
        model.updateDisplay(j, r, item.displayName[j])
    }

    let c = " x " + item.count

    for (let j = tot; j < c.length + tot; j++) {
        model.updateDisplay(j, r, c[j - tot])
    }

    model.clearRestOfRow()
}

const addInv = (model: Mud, n: number, r: number) => {
    let tot = 0
    let inv = model.bot.inventory
    let startIndex = (startItemIndex + model.inventoryOffSet) % inv.slots.length
    for (let i = startIndex; i < inv.slots.length; i++) {
        if (tot >= n) return tot;
        if (inv.slots[i] != null) {
            displayItem(model, inv.slots[i], r + tot)
            tot++
        }
    }
    for (let i = 0; i < startIndex && i < inv.slots.length; i++) {
        if (tot >= n) return tot;
        if (inv.slots[i] != null) {
            displayItem(model, inv.slots[i], r + tot)
            tot++
        }
    }

    while (tot < n) {
        model.clearRow(r + tot)
        tot++
    }
    return tot
}


const showInventoryDisplay = (model: Mud) => {
    showHealthBar(model, 0) 
    showFoodBar(model, 1)
    model.clearRow(2)
    let r = addInv(model, settings["max-inventory-display"], 3)
    model.clearRow(r + 3)
    showCommand(model, r + 4)
}

export default showInventoryDisplay