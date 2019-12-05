const { Action } = require('../interfaces/index')

class RightClick extends Action {
    constructor() {
        super()
        this.name = 'RightClick'
        this.desc = 'Locate'
        this.shortcuts = ['RightMousedown']
        this.eventType = 'mouse'
    }

    exec(aqua, event) {
        if (event.target.getAttribute('aqua-is-line-number')) return

        aqua.cursorMgr.traverse(cursor => {
            cursor.logicalX = Infinity
        })
    }
}

module.exports = RightClick
