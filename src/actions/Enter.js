const { Action } = require('../interfaces/index')

class Enter extends Action {
    constructor() {
        super()
        this.name = 'Enter'
        this.desc = 'Enter'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Enter']
    }

    exec(aqua, event) {
        event.preventDefault()

        aqua.cursorMgr.traverse(cursor => {
            if (!cursor.selection.isCollapsed()) {
                aqua.actionMgr.exec('Backspace', event, {
                    cursor,
                })
            }

            aqua.write(['', ''], cursor)

            cursor.y = cursor.y + 1
            cursor.x = 0
        })
    }
}

module.exports = Enter
