const { Action } = require('../interfaces/index')

class CreateCursor extends Action {
    constructor() {
        super()
        this.name = 'CreateCursor'
        this.desc = 'Create And Locate'
        this.shortcuts = ['Ctrl + LeftMousedown']
        this.eventType = 'mouse'
    }

    exec(aqua, event, state) {
        aqua.cursorMgr.create()
        state.stay = true
        aqua.actionMgr.exec('LeftMousedown', event, state)
    }
}

module.exports = CreateCursor
