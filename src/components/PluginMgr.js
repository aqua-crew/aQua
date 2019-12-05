class PluginMgr {
    constructor(aqua) {
        this.aqua = aqua

        this.plugins = Object.create(null)
    }

    install(plugin) {
        this.plugins[plugin.name] = plugin
        plugin.installed(this.aqua)
    }

    active(plugin) {
        plugin.active()
    }

    inactive(plugin) {
        plugin.inactive()
    }

    uninstall(plugin) {
        this.plugins[plugin.name] = void 0

        plugin.destroy()
    }
}

module.exports = PluginMgr
