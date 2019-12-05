const { Lang } = require('../interfaces/index')

class JavaScript extends Lang {
    constructor() {
        super()

        this.alias = ['js']
    }

    parse(raw) {
        return raw
    }
}

module.exports = JavaScript
