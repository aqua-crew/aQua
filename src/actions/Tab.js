const { Action } = require('../interfaces/index')

class Tab extends Action {
    constructor() {
        super()
        this.name = 'Tab'
        this.desc = 'Tab'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Tab']
    }

    exec(aqua, event) {
        event.preventDefault()

        console.error(this.name)

        aqua.cursorMgr.traverse(cursor => {
            this.genConsoleInfo(aqua, cursor)
        })
    }

    genConsoleInfo(aqua, cursor) {
        if (cursor.selection.isCollapsed()) {
            return
        }

        cursor.resetSelection()

        const infilling = aqua.docMgr.read(cursor.selection.start, cursor.selection.end)
        const contents = `console.log('${infilling} :', ${infilling})`

        aqua.docMgr.write(contents, cursor.coord, true)

        cursor.y = cursor.y + 1
        cursor.x = 0
    }
}

module.exports = Tab
