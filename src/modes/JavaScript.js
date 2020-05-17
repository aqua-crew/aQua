const { Mode } = require('../interfaces/index')

class JavaScript extends Mode {
    constructor() {
        super()

        this.name = ['javascript', 'js']
    }

    parse(raw) {
        return raw
    }
}

module.exports = JavaScript
