const { DOM, rAF } = require('../../utils/index')
const { PluginType } = require('../../enums/index')

const DictionaryRenderer = require('./DictionaryRenderer')

const { Plugin } = require('../../interfaces/index')

class AquaSyntaxHint extends Plugin {
    constructor() {
        super()

        this.name = 'AquaSyntaxHint'
        this.type = PluginType.Buildin
    }

    install(aqua) {
        super.install()

        const lifetimes = aqua.lifetimes

        lifetimes.on('setup', () => {
        })

        lifetimes.on('ready', () => {
        })

        lifetimes.on('complete', () => {
            aqua.renderer.load(DictionaryRenderer)
        })
    }

    uninstall() {
        super.uninstall()
    }


}

module.exports = AquaSyntaxHint
