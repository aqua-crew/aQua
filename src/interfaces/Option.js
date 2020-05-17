class Option {
    constructor() {
        this.alias = []
        this.value = null
        this.desc = ''
        this.request = false
    }

    set(value) {
        this.value = value
    }

    get() {
        return this.value
    }
}

module.exports = Option
