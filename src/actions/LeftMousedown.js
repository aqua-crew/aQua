const { Action } = require('../interfaces/index')

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

        const rect = aqua.korwa.getScrollerRect()

        aqua.cursorMgr.traverse(cursor => {
            if (event.target.getAttribute('aqua-is-line-number')) return

            cursor.physicalY = event.clientY - rect.top
            cursor.physicalX = event.clientX - rect.left - aqua.korwa.lineNumCntrWidth

            cursor.updateCoord({
                update: false
            })

            cursor.selection.setBase(cursor.coord)
            cursor.selection.setTerminal(cursor.coord)
        }, {
            filter: cursor => cursor === aqua.cursorMgr.main
        })
    }
}

module.exports = LeftMousedown
