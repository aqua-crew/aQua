const { ExtendedLine, Line } = require('../models/index')
const { DOM } = require("../utils/index")

class LineMgr {
    constructor(aqua) {
        this.aqua = aqua

        this.mods = Object.create(null)

        this.$cntr = null
        this.$children = null
    }

    init() {
        this.$cntr = this.aqua.uiMgr.get('lineCntr')
        this.$children = this.aqua.uiMgr.get('lineCntr').children
    }

    load(mod) {
        this.mods[mod.name] = mod

        if (!this.aqua.state.mod.line) {
            this.aqua.state.mod.line = mod
        }
    }

    /**
     * 将 Content 转化为 Line 对象
     * @param  {Array<Content>} contents
     * @return {Array<Line>}
     */
    toLines(contents, start = 0, end = contents.length) {
        const lines = []

        for (let i = start; i < end; i++) {
            lines[i] = new Line({
                content: contents[i]
            })
        }

        return lines
    }

    extendLine(lineNum) {
        return new ExtendedLine(this.$getLine(lineNum), this.aqua.korwa)
    }

    // TODO
    $getLine(lineNum, viewport = this.aqua.viewport){
        return this.aqua.korwa.$getLine(lineNum)
    }

    // getCurrentBlock(lineNum, x) {
    //     const measuredLine = this.getMeasuredLine(lineNum)

    //     return measuredLine.getCurrentBlock(x)
    // }

    create($content) {
        return this.getMod().create($content)
    }

    /* Private */
    mount($fragment) {
        const $lineCntr = this.aqua.uiMgr.get('lineCntr')

        this.aqua.uiMgr.mount($lineCntr, $fragment)
    }

    getMod(name = null) {
        if (typeof name !== 'string' && name) {
            return name
        }

        return name ? this.mods[name] : this.aqua.state.mod.line
    }
}

module.exports = LineMgr
