const settings = require("../settings.json")
const states = require("./enums/state.js")
const DisplayStates = states.DisplayState

module.exports = class Mud {
    constructor() {
        this.distance = settings.distance;
        this.setupGrid();

        this.displayState = DisplayStates.Base;
    }


    setupGrid() {
        this.grid = []
        
        for (let j = this.distance * -1; j <= this.distance; j++) {
            let temp = [];
            for (let i = this.distance * -1; i <= this.distance; i++) {
                temp.push(" ");
            }
            this.grid.push(temp);
        }
    }
}


