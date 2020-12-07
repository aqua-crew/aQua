const { Action } = require('../interfaces/index')

class MoveRightBlock extends Action {
    constructor() {
        super()
        this.name = 'MoveRightBlock'
        this.shortcuts = ['Ctrl + →']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            this.moveToRightBlock(aqua, cursor, true)
        })
    }

    moveToRightBlock(aqua, cursor, clearSelection = false) {
        if (clearSelection) {
            if (!cursor.selection.isCollapsed()) {
                cursor.resetSelection()

                return
            }
        }

        aqua.actionMgr.execWithName('MoveRight', 'moveRight', cursor)

        const rightBorder = this.getRightBlockBorder(aqua, cursor)

        if (cursor.x === rightBorder) {
            return
        }

        cursor.x = rightBorder
    }

    getRightBlockBorder(aqua, cursor) {
        const line = aqua.lineMgr.extendLine(cursor.y)
        const block = line.getCurrentBlock(cursor.x)

        return block.rightBorder
    }
}

module.exports = MoveRightBlock
