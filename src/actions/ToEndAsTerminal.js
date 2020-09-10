const { Action } = require('../interfaces/index')

class ToEndAsTerminal extends Action {
    constructor() {
        super()
        this.name = 'ToEndAsTerminal'
        this.shortcuts = ['Shift + End']
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

        aqua.actionMgr.execWithName('ToEnd', 'update', cursor)

        cursor.selection.terminal = cursor.coord
    }
}

module.exports = ToEndAsTerminal
