const { Action } = require('../interfaces/index')

class Input extends Action {
    constructor() {
        super()
        this.name = 'Input'
    }

    exec(aqua, assets) {
        aqua.chronicle.start('Input', aqua.cursorMgr.extract())

        aqua.cursorMgr.traverse(cursor => {
            this.input(aqua, cursor, assets)
        })

        aqua.chronicle.end('Input', aqua.cursorMgr.extract())
    }

    input(aqua, cursor, assets) {
        if (!cursor.selection.isCollapsed()) {
            aqua.actionMgr.execWithName('Backspace', 'backspace', cursor)
        }

        const { y, x } = aqua.docMgr.write(assets, cursor)

        cursor.y = cursor.y + y
        cursor.x = cursor.x + x
    }
}

module.exports = Input
