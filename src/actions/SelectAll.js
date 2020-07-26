const { Action } = require('../interfaces/index')

class SelectAll extends Action {
    constructor() {
        super()
        this.name = 'SelectAll'
        this.desc = 'SelectAll'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Ctrl + A']
    }

    exec(aqua, event) {
        aqua.cursorMgr.removeAll()
        aqua.cursorMgr.traverse(cursor => {
            cursor.y = 0
            cursor.x = 0
            cursor.selection.base = cursor.coord

            cursor.y = Infinity
            cursor.x = Infinity
            cursor.selection.terminal = cursor.coord
        }, {
            track: false,
        })
    }
}

module.exports = SelectAll
