const { Action } = require('../interfaces/index')
const { ArgOpt } = require('../enums/index')

class Quote extends Action {
    constructor() {
        super()
        this.name = 'Quote'
        this.shortcuts = [`'`]
    }

    exec(aqua, event) {
        event.preventDefault()

        aqua.cursorMgr.traverse(cursor => {
            this.update(aqua, cursor)
        })
    }

    update(aqua, cursor) {
        if (cursor.selection.isCollapsed()) {
            aqua.docMgr.write(`'`, cursor)

            cursor.x = cursor.x + 1
            return
        }

        const { start, end, direction } = cursor.selection

        aqua.docMgr.write(`'`, start)

        cursor.y = start.y
        cursor.x = start.x + 1

        const startCoord = cursor.coord.clone()

        cursor.y = end.y
        cursor.x = end.y === start.y ? end.x + 1 : end.x

        const endCoord = cursor.coord.clone()

        aqua.docMgr.write(`'`, endCoord)

        if (direction === ArgOpt.SelectionDirectionIsBottomRight) {
            cursor.selection.base = startCoord
            cursor.selection.terminal = endCoord
            cursor.coord = endCoord

            return
        }

        if (direction === ArgOpt.SelectionDirectionIsTopLeft) {
            cursor.selection.base = endCoord
            cursor.selection.terminal = startCoord
            cursor.coord = startCoord

            return
        }
    }
}

module.exports = Quote
