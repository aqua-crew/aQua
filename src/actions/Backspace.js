const { Action } = require('../interfaces/index')

class Backspace extends Action {
    constructor() {
        super()
        this.name = 'Backspace'
        this.desc = 'Backspace'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Backspace']
    }

    exec(aqua, event) {
        console.error(this.name)
    }
}

module.exports = Backspace
