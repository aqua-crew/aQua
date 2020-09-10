const { Action } = require('../interfaces/index')

class ToDocLastAsTerminal extends Action {
    constructor() {
        super()
        this.name = 'ToDocLastAsTerminal'
        this.shortcuts = ['Shift + Ctrl + End']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            if (cursor.selection.isCollapsed()) {
                cursor.selection.base = cursor.coord
            }

            aqua.actionMgr.execWithName('ToDocLast', 'update', cursor)

            cursor.selection.terminal = cursor.coord
        })
    }
}

module.exports = ToDocLastAsTerminal
