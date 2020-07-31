const { Action } = require('../interfaces/index')

class MoveLeft extends Action {
    constructor() {
        super()
        this.name = 'MoveLeft'
        this.desc = 'MoveLeft'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['←']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            this.moveLeft(aqua, cursor, true)
        })
    }

    moveLeft(aqua, cursor, clearSelection = false) {
        if (clearSelection) {
            if (!cursor.selection.isCollapsed()) {
                cursor.resetSelection()

                return
            }
        }

        const coord = this.getMoveLeftCoord(aqua, cursor.coord)

        if (cursor.coord === coord) {
            return
        }

        if (cursor.y !== coord.y) {
            cursor.y = coord.y
        }

        cursor.x = coord.x
    }

    getMoveLeftCoord(aqua, coord, xMinus = 1) {
        if (coord.x <= 0) {
            if (coord.y === 0) {
                return coord
            }

            return {
                y: coord.y - 1,
                x: Infinity,
            }
        }

        return {
            y: coord.y,
            x: coord.x - 1,
        }
    }
}

module.exports = MoveLeft
