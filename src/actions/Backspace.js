const { Action } = require('../interfaces/index')

class Backspace extends Action {
    constructor() {
        super()
        this.name = 'Backspace'
        this.desc = 'Backspace'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Backspace']
    }

    exec(aqua, event, state = {}) {
        aqua.cursorMgr.traverse(cursor => {
            this.backspace(aqua, cursor)
        })
    }

    backspace(aqua, cursor) {
        const selection = cursor.selection

        console.error('在执行删除之前的坐标', cursor.coord.y, cursor.coord.x)

        if (selection.isCollapsed()) {
            const coord = cursor.coord.clone()

            aqua.actionMgr.execWithName('MoveLeft', 'moveLeft', cursor)

            aqua.docMgr.delete(coord, cursor.coord)

            return
        }

        aqua.docMgr.delete(selection.start, selection.end)
        cursor.moveToSelectionStart()
        cursor.resetSelection()
    }
}

module.exports = Backspace
