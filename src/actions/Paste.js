const { Action } = require('../interfaces/index')

class Paste extends Action {
    constructor() {
        super()
        this.name = 'Paste'
    }

    exec(aqua, event, state) {
        event.preventDefault()

        aqua.chronicle.start('Paste', aqua.cursorMgr.extract())

        const data = event.clipboardData.getData('text/plain')

        const cursorSize = aqua.cursorMgr.size
        const dataArr = data.split('\n')

        if (cursorSize === dataArr.length) {
            aqua.cursorMgr.traverse((cursor, index) => {
                aqua.actionMgr.execWithName('Input', 'input', cursor, dataArr[index])
            })
        } else {
            aqua.cursorMgr.traverse((cursor, index) => {
                aqua.actionMgr.execWithName('Input', 'input', cursor, dataArr)
            })
        }

        aqua.chronicle.end('Paste', aqua.cursorMgr.extract())
    }
}

module.exports = Paste
