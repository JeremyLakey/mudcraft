const addEvents = (model, display, n, s=0) => {
    for (let i = s, t = 0; t < n && i < model.events.length; t++, i++) {
        display.push(model.events[i])
    }
}

const addCommand = (model, display) => {
    display.push(":" + model.getCommand())
}

module.exports = {
    addEvents,
    addCommand
}