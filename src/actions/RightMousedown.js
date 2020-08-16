const { Action } = require('../interfaces/index')
const { HTMLVariables } = require('../enums/index')

class RightMousedown extends Action {
    constructor() {
        super()
        this.name = 'RightMousedown'
        this.desc = 'Locate'
        this.shortcuts = ['RightMousedown']
        this.eventType = 'mouse'
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
