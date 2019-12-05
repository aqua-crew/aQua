const { Action } = require('../interfaces/index')

class SelectAll extends Action {
    constructor() {
        super()
        this.name = 'SelectAll'
        this.desc = 'SelectAll'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Ctrl + A']
    }

    exec(aqua, event) {
        aqua.cursorMgr.removeAll()
        aqua.cursorMgr.traverse(cursor => {
            cursor.logicalY = 0
            cursor.logicalX = 0
            cursor.updateCoord()
            cursor.selection.setBase(cursor.coord)

            cursor.logicalY = Infinity
            cursor.logicalX = Infinity
            cursor.updateCoord()
            cursor.selection.setTerminal(cursor.coord)
        })
    }
}

module.exports = SelectAll
