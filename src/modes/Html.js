const { Mode } = require('../interfaces/index')

class Html extends Mode {
    constructor() {
        super()

        this.name = 'html'
    }

    parse(raw) {
        return raw
    }
}

module.exports = Html
