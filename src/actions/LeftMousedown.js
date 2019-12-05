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

        aqua.cursorMgr.traverse(cursor => {
            if (event.target.getAttribute('aqua-is-line-number')) return
            const box = aqua.lineMgr.getMeasuredBase()

            cursor.physicalY = event.clientY - box.top
            cursor.physicalX = event.clientX - box.left

            cursor.updateCoord()
            cursor.selection.setBase(cursor.coord)
            cursor.selection.setTerminal(cursor.coord)
        }, {
            filter: cursor => cursor === aqua.cursorMgr.main
        })
    }
}

module.exports = LeftMousedown
