const { Action } = require('../interfaces/index')

class Tab extends Action {
    constructor() {
        super()
        this.name = 'Tab'
        this.shortcuts = ['Tab']
    }

    exec(aqua, event) {
        event.preventDefault()

        let offset = 0
        let lastY = -1

        aqua.cursorMgr.traverse((cursor, index) => {
            if (cursor.y !== lastY) {
                lastY = cursor.y
                offset = 0
            } else {
                cursor.y = cursor.y + offset
            }

            offset = offset + 1

            this.update(aqua, cursor)

            cursor.y = cursor.y + 1
            cursor.x = 0
        })
    }

    update(aqua, cursor) {
        if (cursor.selection.isCollapsed()) {
            return
        }

        cursor.resetSelection()

        const content = this.genConsoleInfo(aqua.docMgr.read(cursor.selection.start, cursor.selection.end))

        aqua.docMgr.write(content, cursor.coord, {
            isInsert: true,
        })
    }

    genConsoleInfo(infilling, type = 'log') {
        const content = `console.log('${infilling}:', ${infilling})`

        return content
    }
}

module.exports = Tab
