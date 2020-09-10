const { Action } = require('../interfaces/index')

class Enter extends Action {
    constructor() {
        super()
        this.name = 'Enter'
        this.shortcuts = ['Enter']
    }

    exec(aqua, event) {
        event.preventDefault()

        aqua.cursorMgr.traverse(cursor => {
            if (!cursor.selection.isCollapsed()) {
                aqua.actionMgr.execWithName('Backspace', 'backspace', cursor)
            }

            aqua.docMgr.write(['', ''], cursor)

            cursor.y = cursor.y + 1
            cursor.x = 0
        })
    }
}

module.exports = Enter
