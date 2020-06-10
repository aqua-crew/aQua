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
        }, {
            acc: false,
        })
        console.error(this.name)
    }
}

module.exports = PageDown
