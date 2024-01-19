

const movementCommands = (bot, chat) => {
    switch (chat) {
        case "north":
        case "w":
            bot.entity.position.z = 1.5 + Math.floor(bot.entity.position.z);
            break;
        
        case "west":
        case "a":
            bot.entity.position.x = 1.5 + Math.floor(bot.entity.position.x);
            break;

        case "south":
        case "s":
            bot.entity.position.z = Math.floor(bot.entity.position.z) + .5 - 1;
            break;

        case "east":
        case "d":
            bot.entity.position.x = Math.floor(bot.entity.position.x) + .5 - 1;
            break;
    }
}


module.exports = {movementCommands}