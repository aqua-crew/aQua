const { Action } = require('../interfaces/index')

class Copy extends Action {
    constructor() {
        super()
        this.name = 'Copy'
    }

    exec(aqua, event, state) {
        event.preventDefault()

        const datas = []

        aqua.cursorMgr.pureTraverse(cursor => {
            if (cursor.selection.isCollapsed()) {
                return
            }

            const { start, end } = cursor.selection
            datas.push(aqua.docMgr.read(start, end).join('\n'))
        })

        if (datas.length > 0) {
            event.clipboardData.setData('text/plain', datas.join('\n'))
        }
    }
}

module.exports = Copy
