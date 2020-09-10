const { Action } = require('../interfaces/index')

class CtrlEnter extends Action {
    constructor() {
        super()
        this.name = 'CtrlEnter'
        this.shortcuts = ['Ctrl + Enter']
    }

    exec(aqua, event) {
        event.preventDefault()

        let yAcc = 0
        let lastY = -1

        aqua.cursorMgr.traverse(cursor => {
            aqua.docMgr.write([''], cursor, {
                isInsert: true,
            })

            if (lastY !== cursor.y) {
                yAcc = 0
            }

            yAcc = yAcc + 1

            lastY = cursor.y

            cursor.y = cursor.y + yAcc
            cursor.x = 0
        })
    }
}

module.exports = CtrlEnter
