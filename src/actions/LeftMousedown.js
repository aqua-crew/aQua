const { Action } = require('../interfaces/index')
const { HTMLVariables } = require('../enums/index')

class LeftMousedown extends Action {
    constructor() {
        super()
        this.name = 'LeftMousedown'
        this.desc = 'Locate'
        this.shortcuts = ['LeftMousedown']
        this.eventType = 'mouse'
        this.record = false
    }

    exec(aqua, event, state) {
        aqua.state.mousedown = true

        const cursors = aqua.cursorMgr

        if (cursors.size > 1) {
            cursors.removeAll()
        }

        const rect = aqua.korwa.getLineWidthRect()

        cursors.traverse(cursor => {
            if (event.target.getAttribute(HTMLVariables.DisableMouseEvent)) {
                return
            }

            cursor.$y = event.clientY - rect.top
            cursor.$x = event.clientX - rect.left

            cursor.selection.base = cursor.coord
            cursor.selection.terminal = cursor.coord
    }, {
            filter: cursor => cursors.isPrimary(cursor),
            detect: false,
        })
    }
}

module.exports = LeftMousedown
