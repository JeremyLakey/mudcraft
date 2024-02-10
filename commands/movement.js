var canMove = true;

const movementTimeout = () => {
    canMove = false
    setTimeout(() => {
        canMove = true
    }, 250)
}

const movementCommands = (bot, chat) => {
    if (!canMove) return
    bot.entity.position.y = Math.floor(bot.entity.position.y) + 1;
    switch (chat) {
        case "north":
        case "w":
            bot.look(Math.PI * 1.5, bot.entity.pitch, true)
            bot.entity.position.z = 1.5 + Math.floor(bot.entity.position.z)
            break;
        
        case "west":
        case "a":
            bot.look(Math.PI, bot.entity.pitch, true)
            bot.entity.position.x = 1.5 + Math.floor(bot.entity.position.x)
            break;

        case "south":
        case "s":
            bot.look(Math.PI * .5, bot.entity.pitch, true)
            bot.entity.position.z = Math.floor(bot.entity.position.z) - .5;
            break;

        case "east":
        case "d":
            bot.look(0, bot.entity.pitch, true)
            bot.entity.position.x = Math.floor(bot.entity.position.x) - .5;
            break;
    }
    movementTimeout()
}


module.exports = {movementCommands}