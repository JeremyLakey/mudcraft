var canMove = true;

const movementTimeout = () => {
    canMove = false
    setTimeout(() => {
        canMove = true
    }, 150)
}

const movementCommands = (bot, chat, jump = false) => {
    if (!canMove) return
    // TODO: IMPLEMENT JUMPING
    if (jump) bot.entity.position.y = Math.floor(bot.entity.position.y) + 1.5
    switch (chat) {
        case "north":
        case "w":
            bot.look(0, bot.entity.pitch, true)
            bot.entity.position.z = Math.floor(bot.entity.position.z) - .5
            movementTimeout()
            return true
        
        case "west":
        case "a":
            bot.look(Math.PI * .5, bot.entity.pitch, true)
            bot.entity.position.x = Math.floor(bot.entity.position.x) - .5
            movementTimeout()
            return true

        case "south":
        case "s":
            bot.look(Math.PI, bot.entity.pitch, true)
            bot.entity.position.z = 1.5 + Math.floor(bot.entity.position.z)
            movementTimeout()
            return true

        case "east":
        case "d":
            bot.look(Math.PI * 1.5, bot.entity.pitch, true)
            bot.entity.position.x = 1.5 + Math.floor(bot.entity.position.x)
            movementTimeout()
            return true
    }
    return false;
}


module.exports = {movementCommands}