const { Action } = require('../interfaces/index')

class ToDocLast extends Action {
    constructor() {
        super()
        this.name = 'ToDocLast'
        this.desc = 'ToDocLast'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Ctrl + End']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            cursor.y = Infinity
            cursor.x = Infinity
        }, {
            acc: false,
        })
    }
}

module.exports = ToDocLast
