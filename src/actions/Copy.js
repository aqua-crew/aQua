const { Action } = require('../interfaces/index')

class Copy extends Action {
    constructor() {
        super()
        this.name = 'Copy'
        this.desc = 'Copy'
        this.shortcuts = ['Ctrl + LeftMousedown']
    }

    exec(aqua, event, state) {
        console.error('Copy', event)
    }
}

module.exports = Copy
