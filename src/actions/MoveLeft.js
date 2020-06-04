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

            if (cursor.x <= 0) {
                if (cursor.y === 0) {
                    return
                }

                cursor.y = cursor.y - 1
                cursor.x = Infinity

                return
            }

            cursor.x = cursor.x - 1
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
