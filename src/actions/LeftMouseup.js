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

module.exports = LeftMouseup
