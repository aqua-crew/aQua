const { Action } = require('../interfaces/index')

class ToEndAsTerminal extends Action {
    constructor() {
        super()
        this.name = 'ToEndAsTerminal'
        this.desc = 'ToEndAsTerminal'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Shift + End']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            if (cursor.selection.selectLines === 0) {
                cursor.selection.setBase(cursor.coord)
            }

            aqua.actionMgr.exec('ToEnd', event, {
                cursor,
            })

            cursor.updateCoord()

            cursor.selection.setTerminal(cursor.coord)
        }, {
            acc: false,
        })
    }
}

module.exports = ToEndAsTerminal
