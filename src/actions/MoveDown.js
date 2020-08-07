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

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            this.moveDown(aqua, cursor, true)
        })
    }

    moveDown(aqua, cursor, clearSelection = false) {
        if (clearSelection) {
            cursor.resetSelection()
        }

        const coord = this.getMoveDownCoord(aqua, cursor.coord)

        if (cursor.coord === coord) {
            return
        }

        if (cursor.y === coord.y) {
            if (coord.insideY !== null) {
                cursor.insideY = coord.insideY
            } else if (coord.x !== null) {
                cursor.x = coord.x
            }

            return
        }

        cursor.y = coord.y
        cursor.insideY = 0
    }

    getMoveDownCoord(aqua, coord, yPlus = 1, insideYPlus = 1) {
        const max = aqua.docMgr.size - 1
        const xMax = aqua.docMgr.getLine(coord.y).length

        if (coord.y === max) {
            if (coord.x === xMax) {
                return coord
            }

            return {
                y: coord.y,
                x: xMax,
                insideY: null,
            }
        }

        if (coord.insideY < coord.maxInsideY) {
            return {
                y: coord.y,
                x: null,
                insideY: coord.insideY + 1,
            }
        } else {
            return {
                y: coord.y + 1,
                x: null,
                insideY: null, // 其实这里是返回 0 就可以了, 但是为了与 MoveUp 对应起来, 理由见 MoveUp.prototype.getMoveDownCoord.
            }
        }
    }
}

module.exports = MoveDown
