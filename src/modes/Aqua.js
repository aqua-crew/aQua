const { Mode } = require('../interfaces/index')

class Aqua extends Mode {
    constructor() {
        super()

        this.name = 'aqua'
    }

    parse(raw) {
        return raw
    }
}

module.exports = Aqua
