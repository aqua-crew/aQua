const { Action } = require('../interfaces/index')
const { ActionEventType } = require('../enums/index')

class CtrlLeftMouseUp extends Action {
    constructor() {
        super()
        this.name = 'CtrlLeftMouseUp'
        this.eventType = ActionEventType.Mouse
        this.shortcuts = ['Ctrl + LeftMouseUp']
        this.record = false
    }

    exec(aqua, event, state) {
        state.isCreateCursor = true
        aqua.actionMgr.exec('LeftMouseup', event, state)
    }
}

module.exports = CtrlLeftMouseUp
