const { Action } = require('../interfaces/index')

class ToEnd extends Action {
    constructor() {
        super()
        this.name = 'ToEnd'
        this.shortcuts = ['End']
    }

    exec(aqua, event, state = {}) {
        aqua.cursorMgr.traverse(cursor => {
            if (!cursor.selection.isCollapsed()) {
                cursor.resetSelection()
            }

            this.update(aqua, cursor)
        })
    }

    update(aqua, cursor) {
        cursor.x = Infinity
    }
}

module.exports = ToEnd
