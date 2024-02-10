const settings = require("../settings.json")
const states = require("./enums/state.js")
const DisplayStates = states.DisplayState

const colorTools = require("../display/displays/utils/color.js")

const term = require("node-terminal-tools")
const output = term.output

module.exports = class Mud {
    constructor(bot) {
        this.distance = settings.distance;
        this.setupGrid();

        this.displayState = DisplayStates.Base;
        this.events = []
        this.bot = bot

        this.currentMessage = ""

        this.lastX = 0
        this.lastY = 0

        this.currentColor = 0
        this.setupCache(output.width, output.height)
        output.addResizeCallback((w, h) => {this.setupCache(w, h)})
    }

    setupCache(width, height) {
        this.displayCache = []
        this.colorCache = []

        for (let i = 0; i < height; i++) {
            let temp = []
            let tempC = []
            for (let j = 0; j < width; j++) {
                temp.push(" ")
                tempC.push(0)
            }
            this.displayCache.push(temp)
            this.colorCache.push(temp)
        }
    }

    updateDisplay(x, y, v) {
        if (!this.displayCache) return;
        this.lastX = x
        this.lastY = y
        if (this.displayCache[y][x] != v || this.colorCache[y][x] != this.currentColor) {
            this.displayCache[y][x] = v
            this.colorCache[y][x] = this.currentColor
            output.updateCursor(y, x, colorTools.getColor(this.currentColor) + v)
        }
    }

    clearRow(r) {
        for (let i = 0; i < output.width; i++) {
            this.displayCache[r][i] = " "
            this.colorCache[r][i] = 0
            output.updateCursor(r, i, " ")
        }
    }

    clearRestOfRow() {
        for (let i = this.lastX + 1; i < output.width; i++) {
            this.displayCache[this.lastY][i] = " "
            this.colorCache[this.lastY][i] = 0
            output.updateCursor(this.lastY, i, " ")
        }
    }

    updateColor(c) {
        this.currentColor = c
    }

    setupGrid() {
        this.grid = []
        this.gridC = []
        
        for (let j = (this.distance * -1); j <= this.distance; j++) {
            let temp = []
            let tempC = []
            for (let i = (this.distance * -1); i <= this.distance; i++) {
                temp.push(" ")
                tempC.push(0)
            }
            this.grid.push(temp)
            this.gridC.push(tempC)
        }
    }

    getCommand() {
        return currentMessage;
    }
}


