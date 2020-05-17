const { Mode } = require('../interfaces/index')

class Css extends Mode {
    constructor() {
        super()

        this.name = 'css'
    }

    parse(raw) {
        return raw
    }
}

module.exports = Css
