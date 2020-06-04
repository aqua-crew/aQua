const { Action } = require('../interfaces/index')

class MoveRight extends Action {
    constructor() {
        super()
        this.name = 'MoveRight'
        this.desc = 'MoveRight'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['→']
    }

    exec(aqua, event, state = {}) {
        const fn = (cursor, clearSelection = true) => {
            if (clearSelection) {
                cursor.selection.reset()
            }

            const max = aqua.docMgr.size - 1
            const lineLen = aqua.docMgr.getLine(cursor.y).length

            if (cursor.x >= lineLen) {
                if (cursor.y === max) {
                    return
                }

                cursor.y = cursor.y + 1
                cursor.x = 0

                return
            }

            cursor.x = cursor.x + 1
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

module.exports = MoveRight
