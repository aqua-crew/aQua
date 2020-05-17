const { Action } = require('../interfaces/index')

class Enter extends Action {
    constructor() {
        super()
        this.name = 'Enter'
        this.desc = 'Enter'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Enter']
    }

    exec(aqua, event) {
        console.error(this.name)

        aqua.cursorMgr.traverse(cursor => {
            aqua.write(['', ''], cursor.coord)
        })
    }
}

module.exports = Enter

