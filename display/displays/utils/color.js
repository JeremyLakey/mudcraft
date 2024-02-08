const term = require("node-terminal-tools")
const output = term.output

const getColor = (c) => {
    // we return the whole string, because we have to cache the color
    switch(c) {
        case 1:
            return "\x1b[31;1;4m"

        case 2:
            return "\x1b[31;0;0m#"

        case 3:
            return "\x1b[31;1;4m"

        case 4:
            return "\x1b[31;1;4m"

        case 5:
            return "\x1b[31;1;4m"
        
        case 0:
        default:   
            return "\x1b[0m"
    }
}

module.exports = {getColor}