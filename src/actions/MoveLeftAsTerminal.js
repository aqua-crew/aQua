const { Action } = require('../interfaces/index')

class MoveLeftWithTerminal extends Action {
    constructor() {
        super()
        this.name = 'MoveLeftWithTerminal'
        this.shortcuts = ['Shift + ←']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            if (cursor.selection.isCollapsed()) {
                cursor.selection.base = cursor.coord
            }

            aqua.actionMgr.execWithName('MoveLeft', 'moveLeft', cursor)

            cursor.selection.terminal = cursor.coord
        })
    }
}

module.exports = MoveLeftWithTerminal
