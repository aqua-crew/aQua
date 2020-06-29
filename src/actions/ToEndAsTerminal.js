const { Action } = require('../interfaces/index')

class ToEndAsTerminal extends Action {
    constructor() {
        super()
        this.name = 'ToEndAsTerminal'
        this.desc = 'ToEndAsTerminal'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Shift + End']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            if (cursor.selection.isCollapsed()) {
                cursor.selection.base = cursor.coord
            }

            aqua.actionMgr.exec('ToEnd', event, {
                cursor,
            })

            cursor.selection.terminal = cursor.coord
        }, {
            acc: false,
        })
    }
}

module.exports = ToEndAsTerminal
