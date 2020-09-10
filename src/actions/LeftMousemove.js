const { Action } = require('../interfaces/index')
const { HTMLVariables, ActionEventType } = require('../enums/index')

class LeftMousemove extends Action {
    constructor() {
        super()
        this.name = 'LeftMousemove'
        this.shortcuts = ['LeftMousemove']
        this.eventType = ActionEventType.Mouse
        this.record = false
    }

    exec(aqua, event, state) {
        if (!aqua.state.mousedown) {
            return
        }

        const rect = aqua.korwa.getLineWidthRect()

        aqua.cursorMgr.traverse(cursor => {
            if (event.target.getAttribute(HTMLVariables.DisableMouseEvent)) {
                return
            }

            cursor.$y = event.clientY - rect.top
            cursor.$x = event.clientX - rect.left

            cursor.selection.terminal = cursor.coord
        }, {
            filter: cursor => aqua.cursorMgr.isPrimary(cursor),
            detect: false,
            after: state.isCreateCursor ? () => { this.detectAndMark(aqua) } : null,
        })
    }

    detectAndMark(aqua) {
        const cursors = aqua.cursorMgr.detectCursorSelectionOverlay()

        for (let i = 0; i < cursors.length; i++) {
            aqua.marker.mark(cursors[i].status, 'OverlayMark')
        }
    }
}

module.exports = LeftMousemove
