const { Action } = require('../interfaces/index')

class ToDocFirst extends Action {
    constructor() {
        super()
        this.name = 'ToDocFirst'
        this.shortcuts = ['Ctrl + Home']
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
        cursor.y = 0
        cursor.x = 0
    }
}

module.exports = ToDocFirst
