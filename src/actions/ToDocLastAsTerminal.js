const { Action } = require('../interfaces/index')

class ToDocLastAsTerminal extends Action {
    constructor() {
        super()
        this.name = 'ToDocLastAsTerminal'
        this.desc = 'ToDocLastAsTerminal'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Shift + Ctrl + End']
    }

    exec(aqua, event) {
        aqua.cursorMgr.traverse(cursor => {
            if (cursor.selection.selectLines === 0) {
                cursor.selection.setBase(cursor.coord)
            }

            aqua.actionMgr.exec('ToDocLast', event, {
                cursor,
            })

            cursor.updateCoord()

            cursor.selection.setTerminal(cursor.coord)
        }, {
            acc: false,
        })
    }
}

module.exports = ToDocLastAsTerminal
