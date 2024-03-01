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

module.exports = {
    addEvents,
    addCommand
}