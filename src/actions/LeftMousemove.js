const { Action } = require('../interfaces/index')
const { HTMLVariables } = require('../enums/index')

const DisableMouseEvent = HTMLVariables.DisableMouseEvent

class LeftMousemove extends Action {
    constructor() {
        super()
        this.name = 'LeftMousemove'
        this.desc = 'Locate'
        this.shortcuts = ['LeftMousemove']
        this.eventType = 'mouse'
    }

    exec(aqua, event, state) {
        if (!state.mousedown) {
            return
        }

        const rect = aqua.korwa.getLineWidthRect()

        aqua.cursorMgr.traverse(cursor => {
            if (event.target.getAttribute(DisableMouseEvent)) return

            cursor.$y = event.clientY - rect.top
            cursor.$x = event.clientX - rect.left

            cursor.selection.terminal = cursor.coord
        }, {
            filter: cursor => cursor === aqua.cursorMgr.main
        })
    }
}

module.exports = LeftMousemove
