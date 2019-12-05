const { Action } = require('../interfaces/index')

class CtrlBackspace extends Action {
    constructor() {
        super()
        this.name = 'CtrlBackspace'
        this.desc = 'CtrlBackspace'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Ctrl + Backspace']
    }

    exec(aqua, event) {
        console.error(this.name)
    }
}

module.exports = CtrlBackspace
