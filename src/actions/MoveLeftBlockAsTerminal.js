const { Action } = require('../interfaces/index')

class MoveLeftBlockAsTerminal extends Action {
    constructor() {
        super()
        this.name = 'MoveLeftBlockAsTerminal'
        this.shortcuts = ['Shift + Ctrl + ←']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            if (cursor.selection.isCollapsed()) {
                cursor.selection.base = cursor.coord
            }

            aqua.actionMgr.execWithName('MoveLeftBlock', 'moveToLeftBlock', cursor)

            cursor.selection.terminal = cursor.coord
        })
    }
}

module.exports = MoveLeftBlockAsTerminal
