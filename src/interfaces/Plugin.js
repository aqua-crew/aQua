class Plugin {
    constructor() {
        this.name = ''
        this.desc = ''

        this._active = false
    }

    set active(value) {
        this._active = value

        this._active ? this.active() : this.inactive()
    }

    get active() {
        return this._active
    }

    installed(aqua) {
        this.aqua = aqua
    }

    active() {}
    inactive() {}
    uninstalled() {}
}

module.exports = Plugin
