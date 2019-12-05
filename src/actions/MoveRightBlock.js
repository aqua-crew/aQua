const { Action } = require('../interfaces/index')

class MoveRightBlock extends Action {
    constructor() {
        super()
        this.name = 'MoveRightBlock'
        this.desc = 'MoveRightBlock'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Ctrl + →']
    }

    exec(aqua, event, state = {}) {
        const fn = (cursor, clearSelection = true) => {
            if (clearSelection) {
                cursor.selection.reset()
            }

            const max = aqua.lineMgr.getSize() - 1
            const lineLen = aqua.lineMgr.getLength(cursor.logicalY)

            if (cursor.logicalX >= lineLen) {
                if (cursor.logicalY === max) {
                    return
                }

                cursor.logicalY = cursor.logicalY + 1
                cursor.logicalX = 0

                return
            }

            const block = aqua.lineMgr.getCurrentBlock(cursor.logicalY, cursor.logicalX)
            cursor.logicalX = block.rightBorder
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

module.exports = MoveRightBlock
