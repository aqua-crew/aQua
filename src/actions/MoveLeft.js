const { Action } = require('../interfaces/index')

class MoveLeft extends Action {
    constructor() {
        super()
        this.name = 'MoveLeft'
        this.desc = 'MoveLeft'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['←']
    }

    exec(aqua, event, state = {}) {
        const fn = (cursor, clearSelection = true) => {
            if (clearSelection) {
                cursor.selection.reset()
            }

            if (cursor.logicalX <= 0) {
                if (cursor.logicalY === 0) {
                    return
                }

                cursor.logicalY = cursor.logicalY - 1
                cursor.logicalX = Infinity

                return
            }

            cursor.logicalX = cursor.logicalX - 1
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

module.exports = MoveLeft

// + GapBuffer / Rope
// + Doc
// + Selected
// + Selection
