const { Action } = require('../interfaces/index')
const { ActionEventType } = require('../enums/index')

class CreateCursor extends Action {
    constructor() {
        super()
        this.name = 'CreateCursor'
        this.shortcuts = ['Ctrl + LeftMousedown']
        this.eventType = ActionEventType.Mouse
        this.record = false
    }

    exec(aqua, event, state) {
        const rect = aqua.korwa.getLineWidthRect()
        const phantom = aqua.cursorMgr.usePhantom()

        phantom.$y = event.clientY - rect.top
        phantom.$x = event.clientX - rect.left

        const cursor = aqua.cursorMgr.create(phantom.coord)

        cursor.selection.base = cursor.coord
        cursor.selection.terminal = cursor.coord

        const overlayCursor = aqua.cursorMgr.detectCursorCoordOverlay(cursor)

        if (overlayCursor) {
            aqua.cursorMgr.remove(cursor)
            aqua.cursorMgr.setPrimary(overlayCursor)
        }
    }
}

module.exports = CreateCursor
