const { Action } = require('../interfaces/index')

class CtrlEnter extends Action {
    constructor() {
        super()
        this.name = 'CtrlEnter'
        this.desc = 'CtrlEnter'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Ctrl + Enter']
    }

    exec(aqua, event) {
        return

        event.preventDefault()

        aqua.cursorMgr.traverse(cursor => {
            cursor.x = Infinity

            aqua.write(['', ''], cursor)

            cursor.y = cursor.y + 1
            cursor.x = 0
        })
    }
}

module.exports = CtrlEnter
