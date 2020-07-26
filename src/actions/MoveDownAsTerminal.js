const { Action } = require('../interfaces/index')

class MoveDownWithTerminal extends Action {
    constructor() {
        super()
        this.name = 'MoveDownWithTerminal'
        this.desc = 'MoveDownWithTerminal'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Shift + ↓']
    }

    exec(aqua, event, state = {}) {
        aqua.cursorMgr.traverse(cursor => {
            if (cursor.selection.isCollapsed()) {
                cursor.selection.base = cursor.coord
            }

            aqua.actionMgr.execWithName('MoveDown', 'moveDown', cursor)

            cursor.selection.terminal = cursor.coord
        }, {
            acc: false,
        })
    }
}

module.exports = MoveDownWithTerminal
