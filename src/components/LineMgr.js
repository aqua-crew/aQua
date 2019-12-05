const { MeasuredLine, Line } = require('../models/index')
const { DOM } = require("../utils/index")

class LineMgr {
    constructor(aqua) {
        this.aqua = aqua

        this.mods = Object.create(null)
    }

    /**
     * Line 与 Mode 存的是实例, 因为他们是一个 Handler. Cursor 存的是构造函数, 因为需要返回实例
     * @param  {[type]} Line [description]
     * @return {[type]}      [description]
     */
    load(Line) {
        const mod = new Line(this.aqua)
        this.mods[Line.name] = mod

        if (!this.aqua.state.mod.line) {
            this.aqua.state.mod.line = mod
        }
    }

    /**
     * 将 Content 转化为 Line 对象
     * @param  {Array<Content>} contents
     * @return {Array<Line>}
     */
    toLines(contents) {
        const lines = []

        for (let i = 0; i < contents.length; i++) {
            lines[i] = new Line({
                content: contents[i]
            })
        }

        return lines
    }

    getTop(lineNum) {
        return this.getLine(lineNum).getBoundingClientRect().top - this.getMeasuredBase().top
    }

    getLineRects(lineNum) {
        return this.getLine(lineNum).children[1].firstChild.getClientRects()
    }

    getLine(lineNum) {
        const $line = this.aqua.uiMgr.get('lineCntr').children[lineNum]

        return $line
    }

    getMeasuredBase() {
        return this.aqua.uiMgr.get('lineCntr').getBoundingClientRect()
    }

    getMeasuredLine(lineNum) {
        return new MeasuredLine(this.getLine(lineNum), this.getMeasuredBase(), lineNum)
    }

    getMeasuredLineRect(lineNum) {
        const rect = this.getLine(lineNum).getBoundingClientRect()
        const box = this.getMeasuredBase()

        return {
            left: rect.left - box.left,
            right: rect.right - box.left,
            top: rect.top - box.top,
            bottom: rect.bottom - box.top,
        }
    }

    getCurrentBlock(lineNum, x) {
        const measuredLine = this.getMeasuredLine(lineNum)

        return measuredLine.getCurrentBlock(x)
    }

    /**
     * 获得文档大小
     * @return {Number}
     */
    getSize() {
        const doc = this.aqua.contentMgr.doc
        return doc.size
    }

    /**
     * 获得单行长度
     * @param  {Number} lineNum [行号]
     * @return {Number}
     */
    getLength(lineNum) {
        const measuredLine = this.getMeasuredLine(lineNum)

        return measuredLine.getLength()
    }

    /* Insert */
    insert(elements, startLineNum, mod = this.aqua.state.mod.line) {
        mod = this.getMod(mod)

        const $root = DOM.f()
        const len = elements.length

        for (let i = 0; i < len; i++) {
            DOM.appendChild($root, mod.create(elements[i]))
        }

        DOM.appendChild(this.aqua.uiMgr.get('lineCntr'), $root, startLineNum)

        this.updateLineNum(startLineNum)
    }

    update(elements, startLineNum = 0, mod = this.aqua.state.mod.line) {
        const $lineCntr = this.aqua.uiMgr.get('lineCntr')
        const $children = $lineCntr.children
        const len = elements.length

        for (let i = 0; i < len; i++) {
            const lineNum = startLineNum + i
            DOM.replaceChild($lineCntr, elements[lineNum], $children[lineNum])
        }

        this.updateLineNum(startLineNum)
    }

    updateLineNum(start = 0, effect = 0) {
        const startLineNum = this.aqua.optionMgr.get('line').start
        const $children = this.aqua.uiMgr.get('lineCntr').children
        const len = $children.length

        const end = effect === 0 ? len : Math.min(start + effect, len)

        for (let i = start; i < end; i++) {
            $children[i].firstChild.textContent = i + startLineNum
        }
    }

    /* Private */
    mount($fragment) {
        const $lineCntr = this.aqua.uiMgr.get('lineCntr')
        this.aqua.uiMgr.mount($lineCntr, $fragment)
    }

    getMod(name = null) {
        if (typeof name !== 'string') {
            return name
        }

        return name ? this.mods[name] : this.aqua.state.mod.line
    }
}

module.exports = LineMgr
