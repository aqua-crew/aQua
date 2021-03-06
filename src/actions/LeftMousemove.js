const { Action } = require('../interfaces/index')

class LeftMousemove extends Action {
    constructor() {
        super()
        this.name = 'LeftMousemove'
        this.desc = 'Locate'
        this.shortcuts = ['LeftMousemove']
        this.eventType = 'mouse'
        this.before = false
    }

    exec(aqua, event, state) {
        if (!state.mousedown) {
            return
        }

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

module.exports = LeftMousemove
