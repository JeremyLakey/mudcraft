const addEvents = (model, r, n, s=0) => {
    rows = 0
    for (let i = s, t = 0; t < n && i < model.events.length; t++, i++) {
        model.clearRow(r + rows)
        for (let j = 0; j < model.events[i].length; j++) {
            model.updateDisplay(j, r + rows, model.events[i][j])
        }
        rows++
    }
}

const addCommand = (model, display) => {
    display.push(":" + model.getCommand())
}

const command = ": "
const showCommand = (model, r) => {
    for (let i = 0; i < command.length; i++) {
        model.updateDisplay(i, r, command[i])
    }
    
    for (let i = 0; i < model.currentMessage.length; i++) {
        model.updateDisplay(i + command.length, r, model.currentMessage[i])
    }

    model.clearRestOfRow()
}

const health = "Health: ";
const showHealthBar = (model, r) => {
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

const food = "Hunger: "
const showFoodBar = (model, r) => {
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
    addCommand,
    showCommand,
    showHealthBar,
    showFoodBar
}