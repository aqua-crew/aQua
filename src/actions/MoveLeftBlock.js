const { Action } = require('../interfaces/index')

class MoveLeftBlock extends Action {
    constructor() {
        super()
        this.name = 'MoveLeftBlock'
        this.shortcuts = ['Ctrl + ←']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            this.moveToLeftBlock(aqua, cursor, true)
        })
    }

    moveToLeftBlock(aqua, cursor, clearSelection = false) {
        if (clearSelection) {
            if (!cursor.selection.isCollapsed()) {
                cursor.resetSelection()

                return
            }
        }

        aqua.actionMgr.execWithName('MoveLeft', 'moveLeft', cursor)

        const leftBorder = this.getLeftBlockBorder(aqua, cursor)

        if (cursor.x === leftBorder) {
            return
        }

        cursor.x = leftBorder
    }

    getLeftBlockBorder(aqua, cursor) {
        const line = aqua.lineMgr.extendLine(cursor.y)
        const block = line.getCurrentBlock(cursor.x)

        return block.leftBorder
    }
}

module.exports = MoveLeftBlock
