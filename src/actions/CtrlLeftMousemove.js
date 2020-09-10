const { Action } = require('../interfaces/index')
const { ActionEventType } = require('../enums/index')

class CtrlLeftMousemove extends Action {
    constructor() {
        super()
        this.name = 'CtrlLeftMousemove'
        this.eventType = ActionEventType.Mouse
        this.shortcuts = ['Ctrl + LeftMousemove']
        this.record = false
    }

    exec(aqua, event, state) {
        state.isCreateCursor = true
        aqua.actionMgr.exec('LeftMousemove', event, state)
    }
}

module.exports = CtrlLeftMousemove
