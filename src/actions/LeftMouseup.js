const { Action } = require('../interfaces/index')
const { HTMLVariables } = require('../enums/index')

class LeftMouseup extends Action {
    constructor() {
        super()
        this.name = 'LeftMouseup'
        this.desc = 'Locate'
        this.shortcuts = ['LeftMouseup']
        this.eventType = 'mouse'
    }

    exec(aqua, event, state) {
        aqua.state.mousedown = false

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
            after: state.isCreateCursor ? () => { this.detectAndRemove(aqua) } : null,
        })
    }

    detectAndRemove(aqua) {
        const overlayCursors = aqua.cursorMgr.detectCursorSelectionOverlay()

        if (overlayCursors.length === 0) {
            return
        }

        const lastCursor = overlayCursors[overlayCursors.length - 1]

        aqua.cursorMgr.remove(overlayCursors)

        aqua.cursorMgr.getPrimary(cursor => {
            cursor.merge(lastCursor)
        })
    }
}

module.exports = LeftMouseup
