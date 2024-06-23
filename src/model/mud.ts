import { Bot } from "mineflayer"

import * as settings from "../settings.json"
import DisplayState from "./enums/display-state"
import DirectionState from "./enums/direction-state"
import HistoryEventType from './enums/event-types'
import {getColor} from "../display/displays/utils/color"

const term = require("node-terminal-tools")
const output = term.output

export default class Mud {
    distance: number;
    direction: DirectionState;

    history: string[];
    visibleHistory: string[];
    historyTypes: HistoryEventType[];

    bot: Bot;
    currentMessage: string;
    lastX: number;
    lastY: number;
    currentColor: number;
    displayState: DisplayState;

    lastDigging: string;

    grid: string[][];
    gridC: number[][];

    displayCache: string[][];
    colorCache: number[][];

    lookUp: boolean;

    inventoryOffSet: number;
    helpOffSet: number;

    constructor(bot: Bot) {
        this.distance = settings.distance;
        this.direction = DirectionState.North

        this.setupGrid();

        this.displayState = DisplayState.Base;
        this.history = []
        this.visibleHistory = []
        this.historyTypes = []
        this.bot = bot

        this.currentMessage = ""
        this.lastDigging = ""

        this.lastX = 0
        this.lastY = 0

        this.lookUp = false

        this.inventoryOffSet = 0
        this.helpOffSet = 0

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

    updateDisplay(x: number, y: number, v: string): void {
        if (!this.displayCache[y] || !this.colorCache) return;
        this.lastX = x
        this.lastY = y
        if (this.displayCache[y][x] != v || this.colorCache[y][x] != this.currentColor) {
            this.displayCache[y][x] = v
            this.colorCache[y][x] = this.currentColor
            output.updateCursor(y, x, getColor(this.currentColor) + v)
        }
        else {
            output.updateCursor(y, x, " ")
        }
    }

    clearRow(r: number): void {
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

    updateColor(c: number): void {
        this.currentColor = c
    }

    setupGrid(): void {
        this.grid = []
        this.gridC = []
        
        for (let j = (this.distance * -1); j <= this.distance; j++) {
            let temp: string[] = []
            let tempC: number[] = []
            for (let i = (this.distance * -1); i <= this.distance; i++) {
                temp.push(" ")
                tempC.push(0)
            }
            this.grid.push(temp)
            this.gridC.push(tempC)
        }
    }

    getCommand(): string {
        return this.currentMessage;
    }


    addHistory(msg: string, type: HistoryEventType = HistoryEventType.Default) {
        this.history.unshift(msg)
        this.visibleHistory.unshift(msg)
        this.historyTypes.unshift(type)
    }

    clearVisibleHistory() {
        this.visibleHistory = []
    }
}


