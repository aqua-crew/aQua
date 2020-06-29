const { Action } = require('../interfaces/index')

class CreateCursor extends Action {
    constructor() {
        super()
        this.name = 'CreateCursor'
        this.desc = 'Create And Locate'
        this.shortcuts = ['Ctrl + LeftMousedown']
        this.eventType = 'mouse'
    }

    exec(aqua, event, state) {
        const rect = aqua.korwa.getLineWidthRect()

        aqua.cursorMgr.usePhantom(phantom => {
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
        })
    }
}

module.exports = CreateCursor
