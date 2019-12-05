const { Action } = require('../interfaces/index')

class ToEnd extends Action {
    constructor() {
        super()
        this.name = 'ToEnd'
        this.desc = 'ToEnd'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['End']
    }

    exec(aqua, event, state = {}) {
        const fn = (cursor, clearSelection = true) => {
            if (clearSelection) {
                cursor.selection.reset()
            }

            cursor.logicalX = Infinity
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

module.exports = ToEnd
