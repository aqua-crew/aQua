const { Lang } = require('../interfaces/index')

class Aqua extends Lang {
    constructor() {
        super()
        this.caseSensitive = false
        this.lang = 'aqua'
    }

    parse(raw) {
        return raw
    }
}

module.exports = Aqua
