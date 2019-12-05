const { Action } = require('../interfaces/index')

class MoveLeftBlock extends Action {
    constructor() {
        super()
        this.name = 'MoveLeftBlock'
        this.desc = 'MoveLeftBlock'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Ctrl + ←']
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

            const block = aqua.lineMgr.getCurrentBlock(cursor.logicalY, cursor.logicalX)

            cursor.logicalX = block.leftBorder
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

module.exports = MoveLeftBlock
