const { Action } = require('../interfaces/index')

class CtrlLeftMouseUp extends Action {
    constructor() {
        super()
        this.name = 'CtrlLeftMouseUp'
        this.desc = 'Locate'
        this.shortcuts = ['Ctrl + LeftMouseUp']
        this.eventType = 'mouse'
    }

    exec(aqua, event, state) {
        state.isCreateCursor = true
        aqua.actionMgr.exec('LeftMouseup', event, state)
    }
}

module.exports = CtrlLeftMouseUp
