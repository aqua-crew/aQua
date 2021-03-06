const { Action } = require('../interfaces/index')

class MoveUpAsTerminal extends Action {
    constructor() {
        super()
        this.name = 'MoveUpAsTerminal'
        this.desc = 'MoveUpAsTerminal'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Shift + ↑']
    }

    exec(aqua, event, state = {}) {
        aqua.cursorMgr.traverse(cursor => {
            if (cursor.selection.isCollapsed()) {
                cursor.selection.base = cursor.coord
            }

            aqua.actionMgr.exec('MoveUp', event, {
                cursor,
            })

            cursor.selection.terminal = cursor.coord
        }, {
            acc: false,
        })
    }
}

module.exports = MoveUpAsTerminal
