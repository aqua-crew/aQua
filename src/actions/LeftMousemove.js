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

        aqua.cursorMgr.traverse(cursor => {
            if (event.target.getAttribute('aqua-is-line-number')) return
            const box = aqua.lineMgr.getMeasuredBase()

            cursor.physicalY = event.clientY - box.top
            cursor.physicalX = event.clientX - box.left

            cursor.updateCoord()
            cursor.selection.setTerminal(cursor.coord)
            cursor.updateSelection()
        }, {
            filter: cursor => cursor === aqua.cursorMgr.main
        })
    }
}

module.exports = LeftMousemove
