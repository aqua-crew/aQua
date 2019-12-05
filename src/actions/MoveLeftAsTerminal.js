const { Action } = require('../interfaces/index')

class MoveLeftWithTerminal extends Action {
    constructor() {
        super()
        this.name = 'MoveLeftWithTerminal'
        this.desc = 'MoveLeftWithTerminal'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Shift + ←']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            if (cursor.selection.selectLines === 0) {
                cursor.selection.setBase(cursor.coord)
            }

            aqua.actionMgr.exec('MoveLeft', event, {
                cursor,
            })

            cursor.updateCoord()

            cursor.selection.setTerminal(cursor.coord)
        }, {
            acc: false,
        })
    }
}

module.exports = MoveLeftWithTerminal
