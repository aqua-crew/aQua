const { Action } = require('../interfaces/index')

class MoveLeftWithTerminal extends Action {
    constructor() {
        super()
        this.name = 'MoveLeftWithTerminal'
        this.desc = 'MoveLeftWithTerminal'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Shift + ←']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            if (cursor.selection.isCollapsed()) {
                cursor.selection.base = cursor.coord
            }

            aqua.actionMgr.exec('MoveLeft', event, {
                cursor,
            })

            cursor.selection.terminal = cursor.coord
        }, {
            acc: false,
        })
    }
}

module.exports = MoveLeftWithTerminal
