const { Action } = require('../interfaces/index')

class Redo extends Action {
    constructor() {
        super()
        this.name = 'Redo'
        this.desc = 'Redo'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Ctrl + Y']
    }

    exec(aqua, event) {
        console.error(this.name)
    }
}

module.exports = Redo
