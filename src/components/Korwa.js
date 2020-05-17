const { DOM, SizeObserver } = require('../utils/index')

class Korwa {
    constructor(aqua) {
        this.aqua = aqua

        this.$measures = Object.create(null)
        this.lineHeight = Object.create(null)

        this.$asyncMeasurers = Object.create(null)
    }

    init() {
        const $f = DOM.f()
        const $modsMeasure = this.aqua.uiMgr.get('modsMeasure')
        const mods = this.aqua.lineMgr.mods

        for (let name in mods) {
            const mod = mods[name]
            const $measure = mod.create()
            this.$measures[mod.name] = $measure
            DOM.appendChild($f, $measure)
        }

        DOM.appendChild($modsMeasure, $f)

        this.measureSingleLineHeight()

        const resizeObserver = new SizeObserver

        resizeObserver.observe(this.aqua.uiMgr.get('viewport'), entry => {
            const contentRect = entry.contentRect

            this.aqua.viewport.height = contentRect.height
            this.aqua.renderer.render(this.aqua.viewport)
        })

        this.lineNumCntrWidth = 50
    }

    getViewportRect() {
        return aqua.uiMgr.get('viewport').getBoundingClientRect()
    }

    getScrollerRect() {
        return aqua.uiMgr.get('scroller').getBoundingClientRect()
    }

    getLineWidthRect() {
        return aqua.uiMgr.get('lineWidthCntr').getBoundingClientRect()
    }

    createMeasure(mod = this.aqua.state.mod.line) {
        const $modsMeasure = this.aqua.uiMgr.get('modsMeasure')
        const $measure = mod.create()
        DOM.appendChild($modsMeasure, $measure)

        return $measure
    }

    measureSingleLineHeight() {
        const $measures = this.$measures

        for (let modName in $measures) {
            this.lineHeight[modName] = this.measureHeight({ data: '' }, modName)
        }
    }

    /* Public */
    getSingleLineHeight(mod = this.aqua.state.mod.line) {
        return this.lineHeight[mod.name]
    }

    measure($ele) {
        return $ele.getBoundingClientRect()
    }

    measureHeight(lineOrData, modName) {
        const $measure = this.$measures[modName]

        DOM.clear($measure.children[1].firstChild)
        DOM.appendChild($measure.children[1].firstChild, this.aqua.processorMgr.transformToElements(lineOrData))

        return this.measure($measure).height
    }

    getMeasurer(key, lineOrData, modName) {
        const $asyncMeasurers = this.$asyncMeasurers
        let measurer = $asyncMeasurers[key]

        if (measurer) {
            return measurer
        }

        const $measure = this.createMeasure(modName)

        measurer = function() {
            const height = $measure.getBoundingClientRect().height
            console.error('measure', height)
            delete $asyncMeasurers[key]
            // $measure.remove()

            return height
        }

        $asyncMeasurers[key] = measurer

        DOM.appendChild($measure.children[1].firstChild, this.aqua.processorMgr.transformToElements(lineOrData))

        return measurer
    }

    measureLinesHeight(lines, {
        viewport = null,
        startFrom = -1,
    } = {}) {
        const heights = []

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            heights.push(this.measureHeight(line, 'Text'))
        }

        return heights
    }

    measureViewport() {
        return this.aqua.uiMgr.get('viewport').getBoundingClientRect()
    }
}

module.exports = Korwa
