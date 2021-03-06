const { Action } = require('../interfaces/index')

class ToStartAsTerminal extends Action {
    constructor() {
        super()
        this.name = 'ToStartAsTerminal'
        this.desc = 'ToStartAsTerminal'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Shift + Home']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            if (cursor.selection.selectLines === 0) {
                cursor.selection.setBase(cursor.coord)
            }

            aqua.actionMgr.exec('ToStart', event, {
                cursor,
            })

            cursor.updateCoord()

            cursor.selection.setTerminal(cursor.coord)
        }, {
            acc: false,
        })
    }
}

module.exports = ToStartAsTerminal
