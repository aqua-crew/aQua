const { Action } = require('../interfaces/index')

class ToDocLast extends Action {
    constructor() {
        super()
        this.name = 'ToDocLast'
        this.shortcuts = ['Ctrl + End']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            if (!cursor.selection.isCollapsed()) {
                cursor.resetSelection()
            }

            this.update(aqua, cursor)
        })
    }

    update(aqua, cursor) {
        cursor.y = Infinity
        cursor.x = Infinity
    }
}

module.exports = ToDocLast
