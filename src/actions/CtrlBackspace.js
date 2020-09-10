const { Action } = require('../interfaces/index')

class CtrlBackspace extends Action {
    constructor() {
        super()
        this.name = 'CtrlBackspace'
        this.shortcuts = ['Ctrl + Backspace']
    }

    exec(aqua, event) {
        console.error(this.name)
    }
}

module.exports = CtrlBackspace
