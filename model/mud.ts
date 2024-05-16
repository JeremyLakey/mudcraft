import { Bot } from "mineflayer"

const settings = require("../settings.json")
import DisplayState from "./enums/display-state"

const colorTools = require("../display/displays/utils/color.js")

const term = require("node-terminal-tools")
const output = term.output

export default class Mud {
    distance: number;
    events: String[];
    bot: Bot;
    currentMessage: String;
    lastX: number;
    lastY: number;
    currentColor: number;
    displayState: DisplayState;

    grid: String[][];
    gridC: Number[][];

    displayCache: String[][];
    colorCache: number[][];

    constructor(bot: Bot) {
        this.distance = settings.distance;
        this.setupGrid();

        this.displayState = DisplayState.Base;
        this.events = []
        this.bot = bot

        this.currentMessage = ""

        this.lastX = 0
        this.lastY = 0

        this.currentColor = 0
        this.setupCache(output.width, output.height)
        output.addResizeCallback((w, h) => {this.setupCache(w, h)})
    }

    setupCache(width: number, height: number): void {
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

    updateDisplay(x: number, y: number, v: String): void {
        if (!this.displayCache[y] || !this.colorCache) return;
        this.lastX = x
        this.lastY = y
        if (this.displayCache[y][x] != v || this.colorCache[y][x] != this.currentColor) {
            this.displayCache[y][x] = v
            this.colorCache[y][x] = this.currentColor
            output.updateCursor(y, x, colorTools.getColor(this.currentColor) + v)
        }
    }

    clearRow(r): void {
        if (!this.displayCache[r] || !this.colorCache) return;
        for (let i = 0; i < this.displayCache[r].length; i++) {
            this.displayCache[r][i] = " "
            this.colorCache[r][i] = 0
            output.updateCursor(r, i, " ")
        }
    }

    clearRestOfRow(): void {
        for (let i = this.lastX + 1; i < output.width; i++) {
            this.displayCache[this.lastY][i] = " "
            this.colorCache[this.lastY][i] = 0
            output.updateCursor(this.lastY, i, " ")
        }
    }

    updateColor(c): void {
        this.currentColor = c
    }

    setupGrid(): void {
        this.grid = []
        this.gridC = []
        
        for (let j = (this.distance * -1); j <= this.distance; j++) {
            let temp: String[] = []
            let tempC: number[] = []
            for (let i = (this.distance * -1); i <= this.distance; i++) {
                temp.push(" ")
                tempC.push(0)
            }
            this.grid.push(temp)
            this.gridC.push(tempC)
        }
    }

    getCommand(): String {
        return this.currentMessage;
    }
}


