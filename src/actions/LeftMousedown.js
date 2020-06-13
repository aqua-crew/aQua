const { Action } = require('../interfaces/index')
const { HTMLVariables } = require('../enums/index')

const DisableMouseEvent = HTMLVariables.DisableMouseEvent

class LeftMousedown extends Action {
    constructor() {
        super()
        this.name = 'LeftMousedown'
        this.desc = 'Locate'
        this.shortcuts = ['LeftMousedown']
        this.eventType = 'mouse'
    }

    exec(aqua, event, state) {
        state.mousedown = true

        if (!state.stay && aqua.cursorMgr.size > 1) {
            aqua.cursorMgr.removeAll()
        }

        const rect = aqua.korwa.getLineWidthRect()

        aqua.cursorMgr.traverse(cursor => {
            if (event.target.getAttribute(DisableMouseEvent)) return

            cursor.$y = event.clientY - rect.top
            cursor.$x = event.clientX - rect.left

            cursor.selection.base = cursor.coord
            cursor.selection.terminal = cursor.coord
        }, {
            filter: cursor => cursor === aqua.cursorMgr.main
        })
    }
}

module.exports = LeftMousedown
