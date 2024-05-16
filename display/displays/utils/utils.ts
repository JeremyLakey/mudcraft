import Mud from "../../../model/mud"


const addEvents = (model: Mud, r: number, n: number, s: number = 0): void => {
    let rows: number = 0
    for (let i = s, t = 0; t < n && i < model.events.length; t++, i++) {
        model.clearRow(r + rows)
        for (let j = 0; j < model.events[i].length; j++) {
            model.updateDisplay(j, r + rows, model.events[i][j])
        }
        rows++
    }
}

const command: String = ": "
const showCommand = (model: Mud, r: number) => {
    for (let i = 0; i < command.length; i++) {
        model.updateDisplay(i, r, command[i])
    }
    
    for (let i = 0; i < model.currentMessage.length; i++) {
        model.updateDisplay(i + command.length, r, model.currentMessage[i])
    }

    model.clearRestOfRow()
}

const health: String = "Health: ";
const showHealthBar = (model: Mud, r: number) => {
    for (let i = 0; i < health.length; i++) {
        model.updateDisplay(i, r, health[i])
    }
    
    model.updateColor(1)
    for (let i = health.length; i < model.bot.health + health.length; i++) {
        model.updateDisplay(i, r, '❤')
    }
    model.updateColor(0)

    model.clearRestOfRow()
}

const food: String = "Hunger: "
const showFoodBar = (model: Mud, r: number) => {
    for (let i = 0; i < food.length; i++) {
        model.updateDisplay(i, r, food[i])
    }
    
    model.updateColor(2)
    for (let i = food.length; i < model.bot.food + food.length; i++) {
        model.updateDisplay(i, r, '#')
    }
    model.updateColor(0)

    model.clearRestOfRow()
}

module.exports = {
    addEvents,
    showCommand,
    showHealthBar,
    showFoodBar
}