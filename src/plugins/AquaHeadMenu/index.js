const { DOM, rAF } = require('../../utils/index')
const { PluginType } = require('../../enums/index')

const { Plugin } = require('../../interfaces/index')

const ToFirstPosition = 0

class AquaHeadMenu extends Plugin {
    constructor() {
        super()

        this.name = 'AquaHeadMenu'
        this.type = PluginType.Buildin

        const $active = DOM.e('div', {'class': 'aqua-head-menu-item aqua-active'}, [
            DOM.e('span', {'class': 'icon'}),
            DOM.e('span', {'class': 'title'}, 'Ayarin.js'),
            DOM.e('i', {'class': 'close'}, '×')
        ])

        const $1 = DOM.e('div', {'class': 'aqua-head-menu-item'}, [
            DOM.e('span', {'class': 'icon'}),
            DOM.e('span', {'class': 'title'}, 'index.scss'),
            DOM.e('i', {'class': 'close'}, '×'),
        ])

        const $2 = DOM.e('div', {'class': 'aqua-head-menu-item'}, [
            DOM.e('span', {'class': 'icon'}),
            DOM.e('span', {'class': 'title'}, 'index.html'),
            DOM.e('i', {'class': 'close'}, '×'),
        ])


        this.$list = DOM.e('div', {'class': 'aqua-head-menu-list'}, [$active, $1, $2])
        this.$menu = DOM.e('div', {'class': 'aqua-head-menu'}, [this.$list])
    }

    install(aqua) {
        super.install()

        const lifetimes = aqua.lifetimes

        lifetimes.on('setup', () => {
            DOM.appendChild(aqua.uiMgr.get('stage'), this.$menu, ToFirstPosition)
        })

        lifetimes.on('ready', () => {
        })

        lifetimes.on('complete', () => {

        })
    }

    uninstall() {
        super.uninstall()
    }
}

module.exports = AquaHeadMenu
