const  { PluginType } = require('../enums/index')

class Plugin {
    constructor() {
        this.name = ''
        this.desc = ''
        this.type = PluginType.Custom
        this.enabled = false
    }

    install(aqua) {
        this.enabled = true
    }
    uninstall() {
        this.enabled = false
    }
}

module.exports = Plugin
