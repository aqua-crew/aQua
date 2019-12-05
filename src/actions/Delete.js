const { Action } = require('../interfaces/index')

class Delete extends Action {
    constructor() {
        super()
        this.name = 'Delete'
        this.desc = 'Delete'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Delete']
    }

    exec(aqua, event) {
        console.error(this.name)
    }
}

module.exports = Delete
