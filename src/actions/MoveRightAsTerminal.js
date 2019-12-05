const { Action } = require('../interfaces/index')

class MoveRightAsTerminal extends Action {
    constructor() {
        super()
        this.name = 'MoveRightAsTerminal'
        this.desc = 'MoveRightAsTerminal'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Shift + →']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            if (cursor.selection.selectLines === 0) {
                cursor.selection.setBase(cursor.coord)
            }

            aqua.actionMgr.exec('MoveRight', event, {
                cursor,
            })

            cursor.updateCoord()

            cursor.selection.setTerminal(cursor.coord)
        }, {
            acc: false,
        })
    }
}

module.exports = MoveRightAsTerminal
