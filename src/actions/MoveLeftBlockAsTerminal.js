const { Action } = require('../interfaces/index')

class MoveLeftBlockAsTerminal extends Action {
    constructor() {
        super()
        this.name = 'MoveLeftBlockAsTerminal'
        this.shortcuts = ['Shift + Ctrl + ←']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            if (cursor.selection.selectLines === 0) {
                cursor.selection.setBase(cursor.coord)
            }

            aqua.actionMgr.exec('MoveLeftBlock', event, {
                cursor,
            })

            cursor.updateCoord()

            cursor.selection.setTerminal(cursor.coord)
        }, {
            acc: false,
        })
    }
}

module.exports = MoveLeftBlockAsTerminal
