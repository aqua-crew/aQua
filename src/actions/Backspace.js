const { Action } = require('../interfaces/index')

class Backspace extends Action {
    constructor() {
        super()
        this.name = 'Backspace'
        this.shortcuts = ['Backspace']
    }

    exec(aqua, event, state = {}) {
        aqua.cursorMgr.traverse(cursor => {
            this.backspace(aqua, cursor)
        })
    }

    backspace(aqua, cursor) {
        const selection = cursor.selection

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
