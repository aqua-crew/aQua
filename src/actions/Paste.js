const { Action } = require('../interfaces/index')

class Paste extends Action {
    constructor() {
        super()
        this.name = 'Paste'
    }

    exec(aqua, event, state) {
        event.preventDefault()
        const data = event.clipboardData.getData('text/plain')

        const cursorSize = aqua.cursorMgr.size
        const dataArr = data.split('\n')

        if (cursorSize === dataArr.length) {
            aqua.cursorMgr.traverse((cursor, index) => {
                aqua.docMgr.write(dataArr[index], cursor)
            })
        } else {
            aqua.cursorMgr.traverse((cursor, index) => {
                aqua.docMgr.write(dataArr, cursor)
            })
        }

        console.log(aqua.cursorMgr.size)
        console.error('Paste', data)
    }
}

module.exports = Paste
