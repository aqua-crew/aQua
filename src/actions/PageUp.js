const { Action } = require('../interfaces/index')

class PageUp extends Action {
    constructor() {
        super()
        this.name = 'PageUp'
        this.desc = 'PageUp'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['PageUp']
    }

    exec(aqua, event) {
        aqua.do(cursor => {
            cursor.$y = cursor.$y - aqua.viewport.height
            cursor.$x = cursor.$x
        }, {
            acc: false,
        })
    }
}

module.exports = PageUp
