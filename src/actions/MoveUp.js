const { Action } = require('../interfaces/index')

class MoveUp extends Action {
    constructor() {
        super()
        this.name = 'MoveUp'
        this.desc = 'MoveUp'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['↑']
    }

    exec(aqua, event, state = {}) {
        const fn = (cursor, clearSelection = true) => {
            if (clearSelection) {
                cursor.selection.reset()
            }

            if (cursor.logicalY === 0) {
                cursor.logicalX = 0

                return
            }

            cursor.logicalY = cursor.logicalY - 1
        }

        if (state.cursor) {
            fn(state.cursor, false)

            return
        }

        aqua.cursorMgr.traverse(fn, {
            acc: false,
        })
    }
}

module.exports = MoveUp
