const { DOM, rAF } = require('../../utils/index')
const { PluginType, CSSVariables } = require('../../enums/index')

const { Plugin } = require('../../interfaces/index')

class AquaProgress extends Plugin {
    constructor() {
        super()

        this.$loading = this.$template()
        this.$progress = this.$loading.firstChild.firstChild
        this.name = 'AquaProgress'
        this.type = PluginType.Buildin
    }

    install(aqua) {
        const lifetimes = aqua.lifetimes
        const progress = aqua.progress

        lifetimes.on('setup', () => {
            DOM.appendChild(aqua.uiMgr.get('aqua'), this.$loading)
        })

        /* TODO */
        lifetimes.on('complete', () => {
            setTimeout(() => {
                this.$loading.remove()
            }, 500)
        })

        progress.onprogress = (progress, max) => {
            this.setProgress(progress / max * 100)
        }
    }

    $template() {
        return DOM.e('div', {'class': 'aqua-loading aqua-bg'}, [
            DOM.e('div', {'class': 'loading'}, [
                DOM.e('div', {'class': 'progress'}),
            ]),
            DOM.e('div', {'class': 'strut'}),
        ])
    }

    setProgress(progress) {
        this.$progress.style.setProperty(CSSVariables.Progress, -100 + progress + '%')
    }

    release() {
        this.$loading = null
        this.$progress = null
    }
}

module.exports = AquaProgress
