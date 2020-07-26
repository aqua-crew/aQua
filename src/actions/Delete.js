const { Action } = require('../interfaces/index')

class Delete extends Action {
    constructor() {
        super()
        this.name = 'Delete'
        this.desc = 'Delete'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Delete']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            this.delete(aqua, cursor)
        })

        console.error(this.name)
    }

    delete(aqua, cursor) {
        const selection = cursor.selection

        if (selection.isCollapsed()) {
            const coord = aqua.actionMgr.execWithName('MoveRight', 'getMoveRightCoord', cursor)

            aqua.docMgr.delete(cursor.coord, coord)

            return
        }

        aqua.docMgr.delete(selection.start, selection.end)
        cursor.moveToSelectionStart()
        cursor.resetSelection()
    }
}

module.exports = Delete
