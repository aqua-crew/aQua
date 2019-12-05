const { Action } = require('../interfaces/index')

class PageUp extends Action {
    constructor() {
        super()
        this.name = 'PageUp'
        this.desc = 'PageUp'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['PageUp']
    }

    exec(aqua, event) {
        console.error(this.name)
    }
}

module.exports = PageUp
