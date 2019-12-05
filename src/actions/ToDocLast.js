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
            cursor.logicalY = Infinity
            cursor.logicalX = Infinity
            cursor.updateCoord()
        }, {
            acc: false,
        })
    }
}

module.exports = ToDocLast
