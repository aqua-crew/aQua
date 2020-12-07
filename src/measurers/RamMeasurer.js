const { DOM, SizeObserver, rAF } = require('../utils/index')
const { ArgOpt } = require('../enums/index')

class RamMeasurer {
    constructor(aqua, extend) {
        this.aqua = aqua

        this.resizeObserver = null
        this.$measureArr = []

        this.init()

        this.lastDocSizeDigit = -1

        this.ramWidth = -1
        this.lineNumWidth = -1

        extend('ramWidth', {
            get: () => {
                return this.ramWidth
            }
        }, ArgOpt.EnableDefineProperty)

        extend('lineNumWidth', {
            get: () => {
                return this.lineNumWidth
            }
        }, ArgOpt.EnableDefineProperty)
    }

    init() {
        this.initMeasurers()
        this.listen()
        this.observe()
    }

    initMeasurers() {
        const $f = DOM.f()
        const $ramMeasurer = this.aqua.uiMgr.get('ramMeasurer')
        const mods = this.aqua.lineMgr.mods

        for (let name in mods) {
            const mod = mods[name]
            const $measure = mod.create()

            this.disableCSSVariable($measure.firstChild.firstChild)
            this.$measureArr.push($measure.firstChild)

            DOM.appendChild($f, $measure)
        }

        DOM.appendChild($ramMeasurer, $f)
    }

    listen() {
        this.aqua.docWatcher.on('change', data => {
            const size = this.aqua.docMgr.size.toString()
            const sizeDigit = size.length

            if (this.lastDocSizeDigit === sizeDigit) {
                return
            }

            this.lastDocSizeDigit = sizeDigit

            this.traverse($measure => {
                rAF(() => {
                    $measure.firstChild.textContent = size
                })
            })
        })
    }

    observe() {
        this.resizeObserver = new SizeObserver

        this.traverse($measure => {
            this.resizeObserver.observe($measure, entry => {
                const target = entry.target
                const contentRect = entry.contentRect

                if (contentRect.height === 0 && contentRect.width === 0) {
                    return
                }

                this.ramWidth = target.clientWidth
                this.lineNumWidth = target.firstChild.clientWidth

                this.aqua.khala.emit('ramWidthResize', {
                    ramWidth: this.ramWidth,
                    lineNumWidth: this.lineNumWidth,
                })
            })
        })
    }

    unobserve() {
        this.resizeObserver && this.resizeObserver.disconnect()
    }

    /* Rare */
    traverse(cb) {
        const $measureArr = this.$measureArr

        for (let i = 0; i < $measureArr.length; i++) {
            cb($measureArr[i])
        }
    }

    disableCSSVariable($ele) {
        $ele.style.setProperty('width', 'auto')
        $ele.style.setProperty('left', 'unset')
    }
}

module.exports = RamMeasurer
