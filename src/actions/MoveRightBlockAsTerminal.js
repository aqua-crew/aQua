const { Action } = require('../interfaces/index')

class MoveRightBlockAsTerminal extends Action {
    constructor() {
        super()
        this.name = 'MoveRightBlockAsTerminal'
        this.shortcuts = ['Shift + Ctrl + →']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            if (cursor.selection.isCollapsed()) {
                cursor.selection.base = cursor.coord
            }

            aqua.actionMgr.execWithName('MoveRightBlock', 'moveToRightBlock', cursor)

            cursor.selection.terminal = cursor.coord
        })
    }
}

module.exports = MoveRightBlockAsTerminal
