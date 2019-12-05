const { Action } = require('../interfaces/index')

class ToStart extends Action {
    constructor() {
        super()
        this.name = 'ToStart'
        this.desc = 'ToStart'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Home']
    }

    exec(aqua, event, state = {}) {
        const fn = (cursor, clearSelection = true) => {
            if (clearSelection) {
                cursor.selection.reset()
            }

            cursor.logicalX = 0
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

module.exports = ToStart
