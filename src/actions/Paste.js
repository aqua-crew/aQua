const { Action } = require('../interfaces/index')

class Paste extends Action {
    constructor() {
        super()
        this.name = 'Paste'
        this.desc = 'Paste'
        this.shortcuts = ['Ctrl + LeftMousedown']
    }

    exec(aqua, event, state) {
        console.error('Paste', event)
    }
}

module.exports = Paste
