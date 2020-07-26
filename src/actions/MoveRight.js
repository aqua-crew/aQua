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

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            this.moveRight(aqua, cursor, true)
        }, {
            acc: false,
        })
    }

    moveRight(aqua, cursor, clearSelection = false) {
        if (clearSelection) {
            cursor.resetSelection()
        }

        const coord = this.getMoveRightCoord(aqua, cursor.coord)

        if (cursor.coord === coord) {
            return
        }

        if (cursor.y !== coord.y) {
            cursor.y = coord.y
        }

        cursor.x = coord.x
    }

    getMoveRightCoord(aqua, coord, xPlus = 1) {
        const max = aqua.docMgr.size - 1
        const xMax = aqua.docMgr.getLine(coord.y).length

        if (coord.x >= xMax) {
            if (coord.y === max) {
                return coord
            }

            return {
                y: coord.y + 1,
                x: 0,
            }
        }

        return {
            y: coord.y,
            x: coord.x + 1,
        }
    }
}

module.exports = MoveRight
