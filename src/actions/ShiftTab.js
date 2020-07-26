const { Action } = require('../interfaces/index')

class ShiftTab extends Action {
    constructor() {
        super()
        this.name = 'ShiftTab'
        this.desc = 'ShiftTab'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Shift + Tab']
    }

    exec(aqua, event) {
        event.preventDefault()

        console.error(this.name)
    }
}

module.exports = ShiftTab
