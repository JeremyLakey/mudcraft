const term = require("node-terminal-tools")
const output = term.output

const setColor = (v, c) => {
    // we return the whole string, because we have to cache the color
    switch(c) {
        case 1:
            output.updateCursor(0, 0, "\x1b[31;1;4m")
            break;

        case 2:
            output.updateCursor(0, 0, "\x1b[31;0;0m#")
            break;

        case 3:
            output.updateCursor(0, 0, "\x1b[31;1;4m")
            break;

        case 4:
            output.updateCursor(0, 0, "\x1b[31;1;4m")
            break;

        case 5:
            output.updateCursor(0, 0, "\x1b[31;1;4m")
            break;
        
        case 0:
        default:   
            output.updateCursor(0, 0, "\x1b[0m")
            break;
    }
}

module.exports = {setColor}