class PluginMgr {
    constructor(aqua) {
        this.aqua = aqua

        this.plugins = Object.create(null)
    }

    install(plugins) {
        const ins = plugin => {
            this.plugins[plugin.name] = plugin
            plugin.install(this.aqua)
        }

        if (Array.isArray(plugins)) {
            plugins.forEach(ins)

            return
        }

        ins(plugins)
    }

    uninstall(plugin) {
        this.plugins[plugin.name] = undefined

        plugin.uninstall()
    }
}

module.exports = PluginMgr
