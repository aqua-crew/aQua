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
        console.error('yes??')
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

    // getTop(lineNum) {
    //     return this.getLine(lineNum).getBoundingClientRect().top - this.getMeasuredBase().top
    // }

    // getLineRects(lineNum) {
    //     return this.getLine(lineNum).children[1].firstChild.getClientRects()
    // }

    // TODO
    $getLine(lineNum, viewport = this.aqua.viewport){
        const $line = viewport.get$Line(lineNum)

        if (!$line) {

        }

        return $line
    }

    // getLine(lineNum, viewport = this.aqua.viewport) {
    //     const $line = viewport.get$Line(lineNum)

    //     if (!$line) {

    //     }

    //     return $line
    // }

    // getMeasuredBase() {
    //     return this.aqua.uiMgr.get('lineCntr').getBoundingClientRect()
    // }

    // getMeasuredLine(lineNum) {
    //     return new MeasuredLine(this.getLine(lineNum), this.aqua.korwa)
    // }

    // getMeasuredLineRect(lineNum) {
    //     const rect = this.getLine(lineNum).getBoundingClientRect()
    //     const box = this.getMeasuredBase()

    //     return {
    //         left: rect.left - box.left,
    //         right: rect.right - box.left,
    //         top: rect.top - box.top,
    //         bottom: rect.bottom - box.top,
    //     }
    // }

    // getCurrentBlock(lineNum, x) {
    //     const measuredLine = this.getMeasuredLine(lineNum)

    //     return measuredLine.getCurrentBlock(x)
    // }

    // /**
    //  * 获得文档大小
    //  * @return {Number}
    //  */
    // getSize() {
    //     console.error('yes')
    //     const doc = this.aqua.contentMgr.doc
    //     return doc.size
    // }

    // *
    //  * 获得单行长度
    //  * @param  {Number} lineNum [行号]
    //  * @return {Number}
    //
    // getLength(lineNum) {
    //     const measuredLine = this.getMeasuredLine(lineNum)

    //     return measuredLine.getLength()
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
