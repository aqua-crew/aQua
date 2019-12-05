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

module.exports = LeftMouseup
