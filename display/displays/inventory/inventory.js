const term = require("node-terminal-tools")
const output = term.output

const utils = require("../utils/utils")

const startItemIndex = 37


const displayItem = (model, item, r) => {
    let tot = 0
    for (let j = 0; j < item.displayName.length; j++) {
        tot++
        model.updateDisplay(j, r, item.displayName[j])
    }

    let c = " x " + item.count

    for (let j = tot; j < c.length + tot; j++) {
        model.updateDisplay(j, r, c[j - tot])
    }
}

const addInv = (model, n, r) => {
    let tot = 0
    let inv = model.bot.inventory
    for (let i = startItemIndex; i < inv.slots.length; i++) {
        if (inv.slots[i] != null) {
            displayItem(model, inv.slots[i], r + tot)
            tot++
        }
    }
    for (let i = 0; i < startItemIndex; i++) {
        if (inv.slots[i] != null) {
            displayItem(model, inv.slots[i], r + tot)
            tot++
        }
    }
    return tot
}


const showInventoryDisplay = (model) => {
    utils.showHealthBar(model, 0) 
    utils.showFoodBar(model, 1)
    model.clearRow(2)
    let r = addInv(model, 20, 3)
    model.clearRow(r + 3)
    utils.showCommand(model, r + 4)
}

module.exports = {showInventoryDisplay}