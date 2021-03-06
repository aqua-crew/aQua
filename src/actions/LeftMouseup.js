const { Action } = require('../interfaces/index')

class LeftMouseup extends Action {
    constructor() {
        super()
        this.name = 'LeftMouseup'
        this.desc = 'Locate'
        this.shortcuts = ['LeftMouseup']
        this.eventType = 'mouse'
    }

    exec(aqua, event, state) {
        state.mousedown = false

        const rect = aqua.korwa.getLineWidthRect()

        aqua.cursorMgr.traverse(cursor => {
            if (event.target.getAttribute('aqua-is-line-number')) return

            cursor.$y = event.clientY - rect.top
            cursor.$x = event.clientX - rect.left

            cursor.selection.terminal = cursor.coord
        }, {
            filter: cursor => cursor === aqua.cursorMgr.main
        })
    }
}

module.exports = LeftMouseup
