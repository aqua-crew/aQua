const { Action } = require('../interfaces/index')

class MoveDown extends Action {
    constructor() {
        super()
        this.name = 'MoveDown'
        this.desc = 'MoveDown'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['↓']
    }

    exec(aqua, event, state = {}) {
        const max = aqua.lineMgr.getSize() - 1

        const fn = (cursor, clearSelection = true) => {
            if (clearSelection) {
                cursor.selection.reset()
            }

            if (cursor.logicalY === max) {
                cursor.logicalX = Infinity

                return
            }

            cursor.logicalY = cursor.logicalY + 1
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

module.exports = MoveDown
