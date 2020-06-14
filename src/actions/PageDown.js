const { Action } = require('../interfaces/index')

class PageDown extends Action {
    constructor() {
        super()
        this.name = 'PageDown'
        this.desc = 'PageDown'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['PageDown']
    }

    exec(aqua, event) {
        aqua.do(cursor => {
            cursor.$y = cursor.$y + aqua.viewport.height
            cursor.$x = cursor.$x
        }, {
            acc: false,
        })
    }
}

module.exports = PageDown
