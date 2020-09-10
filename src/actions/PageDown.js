const { Action } = require('../interfaces/index')

class PageDown extends Action {
    constructor() {
        super()
        this.name = 'PageDown'
        this.shortcuts = ['PageDown']
    }

    exec(aqua, event) {
        const lineHeight = aqua.korwa.getSingleLineHeight()

        aqua.do(cursor => {
            cursor.$y = cursor.$y + aqua.viewport.height - lineHeight
            cursor.$x = cursor.$x
        }, {
            acc: false,
        })
    }
}

module.exports = PageDown
