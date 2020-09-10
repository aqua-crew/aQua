const { Action } = require('../interfaces/index')
const { HTMLVariables, ActionEventType } = require('../enums/index')

class RightMousedown extends Action {
    constructor() {
        super()
        this.name = 'RightMousedown'
        this.shortcuts = ['RightMousedown']
        this.eventType = ActionEventType.Mouse
        this.record = false
    }

    exec(aqua, event) {
        if (event.target.getAttribute(HTMLVariables.DisableMouseEvent)) {
            return
        }

        console.log('OpenMenu')
    }
}

module.exports = RightMousedown
