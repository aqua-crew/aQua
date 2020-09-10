const { Action } = require('../interfaces/index')

class Cut extends Action {
    constructor() {
        super()
        this.name = 'Cut'
        this.shortcuts = ['Ctrl + LeftMousedown']
    }

    exec(aqua, event, state) {
        console.error('Cut', event)
    }
}

module.exports = Cut
