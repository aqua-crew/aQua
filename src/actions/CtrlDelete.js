const { Action } = require('../interfaces/index')

class CtrlDelete extends Action {
    constructor() {
        super()
        this.name = 'CtrlDelete'
        this.shortcuts = ['Ctrl + Delete']
    }

    exec(aqua, event) {
        console.error(this.name)
    }
}

module.exports = CtrlDelete
