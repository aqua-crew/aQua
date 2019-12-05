const { Action } = require('../interfaces/index')

class ToDocFirst extends Action {
    constructor() {
        super()
        this.name = 'ToDocFirst'
        this.desc = 'ToDocFirst'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Ctrl + Home']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            cursor.logicalY = 0
            cursor.logicalX = 0
            cursor.updateCoord()
        }, {
            acc: false,
        })
    }
}

module.exports = ToDocFirst
