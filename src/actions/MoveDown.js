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
        const max = aqua.docMgr.size - 1

        const fn = (cursor, clearSelection = true) => {
            if (clearSelection) {
                cursor.selection.reset()
            }

            if (cursor.y === max) {
                cursor.x = Infinity

                return
            }

            if (cursor.insideY < cursor.maxInsideY) {
                cursor.insideY = cursor.insideY + 1
            } else {
                cursor.y = cursor.y + 1
                cursor.insideY = 0
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

module.exports = MoveDown
