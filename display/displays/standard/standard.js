
const getHealthBar = (model) => {
    
    let bar = "Health: "
    for (let i = 0; i < model.bot.health / 2; i++) {
        bar += ("\x1b[31;1;4m❤")
    }
    return bar
}
const getFoodBar = (model) => {
    
    let bar = "Food: "
    for (let i = 0; i < model.bot.health / 2; i++) {
        bar += ("\x1b[31;0;4m#")
    }
    return bar
}
const addMapRows = (model, display) => {
    for (let i = 0; i < model.grid.length; i++) {
        display.push(model.grid[i])
    }
}


const getStandardDisplay = (model) => {
    /*
    Health: ##########
    Food:   ##########

    XXXXX
    XXpXX
    XXXXX
    
    ****Event 1****
    ****Event 2****
    ****Event 3****

    :

    */
    let display = []
    display.push(getHealthBar(model))
    display.push(getFoodBar(model))
    display.push("")
    addMapRows(model, display)
    display.push("")
    display.push(":")

    return display
}

module.exports = {getStandardDisplay}

