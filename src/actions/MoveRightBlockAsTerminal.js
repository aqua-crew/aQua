const { Action } = require('../interfaces/index')

class MoveRightBlockAsTerminal extends Action {
    constructor() {
        super()
        this.name = 'MoveRightBlockAsTerminal'
        this.desc = 'MoveRightBlockAsTerminal'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Shift + Ctrl + →']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            if (cursor.selection.selectLines === 0) {
                cursor.selection.setBase(cursor.coord)
            }

            aqua.actionMgr.exec('MoveRightBlock', event, {
                cursor,
            })

            cursor.updateCoord()

            cursor.selection.setTerminal(cursor.coord)
        }, {
            acc: false,
        })
    }
}

module.exports = MoveRightBlockAsTerminal
