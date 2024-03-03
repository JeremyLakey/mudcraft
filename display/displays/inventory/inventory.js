const term = require("node-terminal-tools")
const output = term.output

const utils = require("../utils/utils")

const startItemIndex = 37
const addInv = (model, n, r) => {
    let tot = 0
    let inv = model.bot.inventory
    for (let i = startItemIndex; i < inv.slots.length; i++) {
        if (inv.slots[i] != null) {
            tot++
            for (let j = 0; j < inv.slots[i].length; j++) {
                model.updateDisplay(j, r + tot, inv.slots[i][j])
            }
        }
    }
    for (let i = 0; i < startItemIndex; i++) {
        if (inv.slots[i] != null) {
            tot++
            for (let j = 0; j < inv.slots[i].length; j++) {
                model.updateDisplay(j, r + tot, inv.slots[i][j])
            }
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