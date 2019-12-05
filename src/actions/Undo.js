const { Action } = require('../interfaces/index')

class Undo extends Action {
    constructor() {
        super()
        this.name = 'Undo'
        this.desc = 'Undo'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Ctrl + Z']
    }

    exec(aqua, event) {
        console.error(this.name)
    }
}

module.exports = Undo
