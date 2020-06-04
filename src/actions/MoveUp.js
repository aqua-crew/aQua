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

            if (cursor.y === 0) {
                cursor.x = 0

                return
            }

            if (cursor.insideY > 0) {
                cursor.insideY = cursor.insideY - 1
            } else {
                cursor.y = cursor.y - 1
                cursor.insideY = cursor.maxInsideY
            }
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
