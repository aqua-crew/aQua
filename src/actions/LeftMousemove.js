const { Action } = require('../interfaces/index')
const { HTMLVariables } = require('../enums/index')

class LeftMousemove extends Action {
    constructor() {
        super()
        this.name = 'LeftMousemove'
        this.desc = 'Locate'
        this.shortcuts = ['LeftMousemove']
        this.eventType = 'mouse'
    }

    exec(aqua, event, state) {
        if (!aqua.state.mousedown) {
            return
        }

        const after = state.isCreateCursor ? () => { aqua.cursorMgr.detectCursorSelectionOverlay().map(cursor => cursor.state.overlayMark = true) } : null
        const rect = aqua.korwa.getLineWidthRect()

        aqua.cursorMgr.traverse(cursor => {
            if (event.target.getAttribute(HTMLVariables.DisableMouseEvent)) return

            cursor.$y = event.clientY - rect.top
            cursor.$x = event.clientX - rect.left

            cursor.selection.terminal = cursor.coord
        }, {
            filter: cursor => aqua.cursorMgr.isPrimary(cursor),
            acc: false,
            detect: false,
            after,
        })
    }
}

module.exports = LeftMousemove
