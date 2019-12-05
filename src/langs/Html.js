const { Lang } = require('../interfaces/index')

class Html extends Lang {
    constructor() {
        super()
    }

    parse(raw) {
        return raw
    }
}

module.exports = Html
