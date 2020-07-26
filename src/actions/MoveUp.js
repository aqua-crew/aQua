const { Action } = require('../interfaces/index')

class MoveUp extends Action {
    constructor() {
        super()
        this.name = 'MoveUp'
        this.desc = 'MoveUp'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['↑']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            this.moveUp(aqua, cursor, true)
        }, {
            acc: false,
        })
    }

    moveUp(aqua, cursor, clearSelection = false) {
        if (clearSelection) {
            cursor.resetSelection()
        }

        const coord = this.getMoveUpCoord(aqua, cursor.coord)

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
        cursor.insideY = cursor.maxInsideY
    }

    getMoveUpCoord(aqua, coord, yMinus = 1, insideYMinus = 1) {
        if (coord.y === 0) {
            if (coord.x === 0) {
                return coord
            }

            return {
                y: coord.y,
                x: 0,
                insideY: null,
            }
        }

        if (coord.insideY > 0) {
            return {
                y: coord.y,
                x: null,
                insideY: coord.insideY - 1,
            }
        } else {
            return {
                y: coord.y - 1,
                x: null,
                insideY: null // 由于需要获取 coord.y - 1 在被 cursor 设置后的 insideY, 所以这里只能返回 null
            }
        }
    }
}

module.exports = MoveUp
