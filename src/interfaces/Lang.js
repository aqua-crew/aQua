class Lang {
    constructor() {
        this.name = this.constructor.name
        this.alias = []
        this.caseSensitive = false
    }
}

module.exports = Lang
