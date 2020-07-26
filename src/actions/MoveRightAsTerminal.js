const { Action } = require('../interfaces/index')

class MoveRightAsTerminal extends Action {
    constructor() {
        super()
        this.name = 'MoveRightAsTerminal'
        this.desc = 'MoveRightAsTerminal'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Shift + →']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            if (cursor.selection.isCollapsed()) {
                cursor.selection.base = cursor.coord
            }

            aqua.actionMgr.execWithName('MoveRight', 'moveRight', cursor)

            cursor.selection.terminal = cursor.coord
        }, {
            acc: false,
        })
    }
}

module.exports = MoveRightAsTerminal
