const { Action } = require('../interfaces/index')

class MoveUpAsTerminal extends Action {
    constructor() {
        super()
        this.name = 'MoveUpAsTerminal'
        this.desc = 'MoveUpAsTerminal'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Shift + ↑']
    }

    exec(aqua, event, state = {}) {
        aqua.cursorMgr.traverse(cursor => {
            if (cursor.selection.selectLines === 0) {
                cursor.selection.setBase(cursor.coord)
            }

            aqua.actionMgr.exec('MoveUp', event, {
                cursor,
            })

            cursor.updateCoord()

            cursor.selection.setTerminal(cursor.coord)
        }, {
            acc: false,
        })
    }
}

module.exports = MoveUpAsTerminal
