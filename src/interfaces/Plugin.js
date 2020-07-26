const  { PluginType } = require('../enums/index')

class Plugin {
    constructor() {
        this.name = ''
        this.desc = ''
        this.type = PluginType.Custom
    }

    install(aqua) {}
    uninstalled() {}
}

module.exports = Plugin
