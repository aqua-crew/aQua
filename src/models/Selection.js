const Coord = require('./Coord')

class Selection {
    constructor() {
        this.base = new Coord
        this.terminal = new Coord

        this.start = new Coord
        this.end = new Coord

        this.selectLines = 0
    }

    reset() {
        this.base = new Coord
        this.terminal = new Coord

        this.start = new Coord
        this.end = new Coord

        this.selectLines = 0
    }

    setBase(coord, reorder = false) {
        this.base.assign(coord)

        reorder && this.reorder()
    }

    setTerminal(coord, reorder = true) {
        this.terminal.assign(coord)

        reorder && this.reorder()
    }

    /**
     * 1. 两行之间的具体有几行是无法计算得到的. 所以这个 selectLines 并不是具体的行数.
     * 但是可以保证是一个可用数字 (可以用来渲染出高亮的选区部分)
     * @param  {Coord} base
     * @param  {Coord} terminal
     */
    updateInfo(base = this.base, terminal = this.terminal) {
        const lineNumDiff = terminal.logicalY - base.logicalY
        let selectLines = 0

        if (lineNumDiff === 0) {
            const insideLineNumDiff = terminal.insideY - base.insideY

            if (insideLineNumDiff === 0) {
                const charDiff = terminal.logicalX - base.logicalX

                return this.selectLines = charDiff === 0 ? 0 :
                    charDiff > 0 ? 1 : -1
            }

            if (insideLineNumDiff > 1) {
                return this.selectLines = 3
            }

            if (insideLineNumDiff < -1) {
                return this.selectLines = -3
            }

            if (insideLineNumDiff === 1) {
                return this.selectLines = 2
            }

            if (insideLineNumDiff === -1) {
                return this.selectLines = -2
            }
        }

        if (lineNumDiff > 1) {
            return this.selectLines = 3
        }

        if (lineNumDiff < -1) {
            return this.selectLines = -3
        }

        if (lineNumDiff === 1) {
            return this.selectLines = terminal.insideY + base.maxInsideY - base.insideY + 2
        }

        if (lineNumDiff === -1) {
            return this.selectLines = terminal.insideY - base.insideY - terminal.maxInsideY - 2
        }
    }

    reorder() {
        this.updateInfo(this.base, this.terminal)

        if (this.selectLines > 0) {
            this.setStart(this.base)
            this.setEnd(this.terminal)
        } else {
            this.setStart(this.terminal)
            this.setEnd(this.base)
        }
    }

    setStart(coord) {
        this.start.assign(coord)
    }

    setEnd(coord) {
        this.end.assign(coord)
    }
}

module.exports = Selection
