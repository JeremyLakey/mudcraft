const term = require("node-terminal-tools")
const output = term.output

const getColor = (c) => {
    // we return the whole string, because we have to cache the color
    switch(c) {
        case 1: // red
            return "\x1b[31m"

        case 2: // green
            return "\x1b[32m"

        case 3: // dark dark grey
            return "\x1b[38;5;235m"

        case 4: // dark grey
            return "\x1b[38;5;239m"

        case 5: // grey
            return "\x1b[38;5;243m"

        
        case 6: // light grey
            return "\x1b[38;5;248m"
        
        
        case 7: // white
            return "\x1b[38;5;225m"
        
        case 0:
        default:   
            return "\x1b[0m"
    }
}

const getDepth = (d) => {
    switch(d) {
        case -2:
            return 3
        case -1:
            return 4
        case 0:
            return 5
        case 1:
            return 6
        case 2:
        default:
            return 7
    }
}

module.exports = {getColor, getDepth}