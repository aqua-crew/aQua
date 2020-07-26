const Options = require('../options/index')

class OptionMgr {
    constructor(aqua) {
        this.aqua = aqua

        this.options = Options
    }

    load(options) {
        this.options = {...this.options, ...options}
    }

    normalize(options = this.options) {
        this.handleLifetimes(options.lifetimes)
        this.options.plugins = this.handlePlugins(options.plugins)
    }

    handleLifetimes(lifetimes) {
        for (let name in lifetimes) {
            this.aqua.lifetimes.on(name, lifetimes[name])
        }
    }

    handlePlugins(plugins) {
         return plugins.map(plugin => {
            if (plugin && plugin.install) {
                return plugin
            }
        })
    }

    get(key) {
        return this.options[key]
    }

    set(key, value) {
        this.options[key] = value
    }
}

module.exports = OptionMgr
