class OptionMgr {
    constructor(aqua) {
        this.aqua = aqua

        this.options = Object.create(null)
    }

    load(options) {
        this.options = {...this.options, ...options}
    }

    get(key) {
        return this.options[key]
    }

    set(key, value) {
        this.options[key] = value
    }
}

module.exports = OptionMgr
