const { Action } = require('../interfaces/index')

class ToDocFirstAsTerminal extends Action {
    constructor() {
        super()
        this.name = 'ToDocFirstAsTerminal'
        this.shortcuts = ['Shift + Ctrl + Home']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            this.update(aqua, cursor)
        })
    }

    update(aqua, cursor) {
        if (cursor.selection.isCollapsed()) {
            cursor.selection.base = cursor.coord
        }

        aqua.actionMgr.execWithName('ToDocFirst', 'update', cursor)

        cursor.selection.terminal = cursor.coord
    }
}

module.exports = ToDocFirstAsTerminal
