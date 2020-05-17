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

        const rect = aqua.korwa.getScrollerRect()

        aqua.cursorMgr.traverse(cursor => {
            if (event.target.getAttribute('aqua-is-line-number')) return

            cursor.physicalY = event.clientY - rect.top
            cursor.physicalX = event.clientX - rect.left - aqua.korwa.lineNumCntrWidth

            cursor.updateCoord({
                update: false
            })

            cursor.selection.setTerminal(cursor.coord)
            cursor.updateSelection()
        }, {
            filter: cursor => cursor === aqua.cursorMgr.main
        })
    }
}

module.exports = LeftMousemove
