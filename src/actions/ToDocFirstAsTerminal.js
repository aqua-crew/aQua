const { Action } = require('../interfaces/index')

class ToDocFirstAsTerminal extends Action {
    constructor() {
        super()
        this.name = 'ToDocFirstAsTerminal'
        this.desc = 'ToDocFirstAsTerminal'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Shift + Ctrl + Home']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            if (cursor.selection.isCollapsed()) {
                cursor.selection.base = cursor.coord
            }

            aqua.actionMgr.exec('ToDocFirst', event, {
                cursor,
            })

            cursor.selection.terminal = cursor.coord
        }, {
            acc: false,
        })
    }
}

module.exports = ToDocFirstAsTerminal
