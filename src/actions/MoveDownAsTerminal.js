const { Action } = require('../interfaces/index')

class MoveDownWithTerminal extends Action {
    constructor() {
        super()
        this.name = 'MoveDownWithTerminal'
        this.desc = 'MoveDownWithTerminal'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Shift + ↓']
    }

    exec(aqua, event, state = {}) {
        aqua.cursorMgr.traverse(cursor => {
            if (cursor.selection.selectLines === 0) {
                cursor.selection.setBase(cursor.coord)
            }

            aqua.actionMgr.exec('MoveDown', event, {
                cursor,
            })

            cursor.updateCoord()

            cursor.selection.setTerminal(cursor.coord)
        }, {
            acc: false,
        })
    }
}

module.exports = MoveDownWithTerminal
