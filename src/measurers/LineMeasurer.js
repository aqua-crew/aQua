const { DOM } = require('../utils/index')

class LineMeasurer {
    constructor(aqua, extend) {
        this.aqua = aqua

        this.lineHeight = Object.create(null)
        this.$measures = Object.create(null)

        this.init()

        extend(this.getSingleLineHeight.bind(this))
        extend(this.measureHeight.bind(this))
        extend(this.measureLinesHeight.bind(this))
        extend(this.measure.bind(this))
        extend(this.$getLine.bind(this))
    }

    init() {
        this.initMeasurers()
        this.measureSingleLineHeight()
    }

    initMeasurers() {
        const $f = DOM.f()
        const $lineMeasurer = this.aqua.uiMgr.get('lineMeasurer')
        const mods = this.aqua.lineMgr.mods

        for (let name in mods) {
            const mod = mods[name]
            const $measure = mod.create()

            this.$measures[mod.name] = $measure

            DOM.appendChild($f, $measure)
        }

        DOM.appendChild($lineMeasurer, $f)
    }

    getSingleLineHeight(modName = this.aqua.state.mod.line.name) {
        return this.lineHeight[modName]
    }

    measureHeight(lineNumOrLineOrData, modName = 'Text') {
        return this.measure(lineNumOrLineOrData, modName).height
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

    measureSingleLineHeight() {
        const $measures = this.$measures

        for (let modName in $measures) {
            this.lineHeight[modName] = this.measureHeight({ data: '' }, modName)
        }
    }

    measure(lineNumOrLineOrData, modName = 'Text') {
        return this.$getLine(lineNumOrLineOrData, modName).getBoundingClientRect()
    }

    $getLine(lineNumOrLineOrData, modName = 'Text') {
        let lineOrData = lineNumOrLineOrData
        let $line = null

        if (typeof lineNumOrLineOrData === 'number') {
            const lineNum = lineNumOrLineOrData

            $line = this.aqua.viewport.$getLine(lineNum)

            if ($line) {
                return $line
            }

            lineOrData = this.aqua.docMgr.getLine(lineNum)
        }

        const $measure = this.$measures[modName]

        DOM.clear($measure.children[1].firstChild)
        DOM.appendChild($measure.children[1].firstChild, this.aqua.processorMgr.transformToElements(lineOrData))

        return $measure
    }
}

module.exports = LineMeasurer
