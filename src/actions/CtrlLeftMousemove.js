const { Action } = require('../interfaces/index')

class CtrlLeftMousemove extends Action {
    constructor() {
        super()
        this.name = 'CtrlLeftMousemove'
        this.desc = 'Locate'
        this.shortcuts = ['Ctrl + LeftMousemove']
        this.eventType = 'mouse'
        this.before = false
    }

    exec(aqua, event, state) {
        aqua.actionMgr.exec('LeftMousemove', event, state)
    }
}

module.exports = CtrlLeftMousemove
