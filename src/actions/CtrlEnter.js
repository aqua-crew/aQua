const { Action } = require('../interfaces/index')

class CtrlEnter extends Action {
    constructor() {
        super()
        this.name = 'CtrlEnter'
        this.desc = 'CtrlEnter'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Ctrl + Enter']
    }

    exec(aqua, event) {
        console.error(this.name)
    }
}

module.exports = CtrlEnter
