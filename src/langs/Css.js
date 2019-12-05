const { Lang } = require('../interfaces/index')

class Css extends Lang {
    constructor() {
        super()

        this.caseSensitive = false
    }

    parse(raw) {
        return raw
    }
}

module.exports = Css
