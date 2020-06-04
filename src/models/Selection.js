const Coord = require('./Coord')

class Selection {
    constructor() {
        this._base = new Coord

        this.start = new Coord
        this.end = new Coord

        this.collapsed = true
    }

    reset() {
        this._base = new Coord

        this.start = new Coord
        this.end = new Coord

        this.collapsed = true
    }

    set base(coord) {
        this._base.assign(coord)
    }

    set terminal(coord) {
        this.reorder(this._base, coord)
    }

    reorder(base, terminal) {
        this.collapsed = false

        const diffY = terminal.y - base.y

        if (diffY > 0) {
            this.setStart(base)
            this.setEnd(terminal)

            return
        }

        if (diffY < 0) {
            this.setStart(terminal)
            this.setEnd(base)

            return
        }

        const diffX = terminal.x - base.x

        if (diffX > 0) {
            this.setStart(base)
            this.setEnd(terminal)

            return
        }

        if (diffX < 0) {
            this.setStart(terminal)
            this.setEnd(base)

            return
        }

        this.collapsed = true
    }

    setStart(coord) {
        this.start.assign(coord)
    }

    setEnd(coord) {
        this.end.assign(coord)
    }

    getStart() {
        return this.start
    }

    getEnd() {
        return this.end
    }

    isCollapsed() {
        return this.collapsed
    }

    containMinLines(base = this.start, terminal = this.end) {
        const diffY = terminal.y - base.y

        if (diffY > 1 || diffY < -1) {
            return 3
        }

        if (diffY === 0) {
            const diffInsideY = terminal.insideY - base.insideY

            if (diffInsideY === 0) {
                return terminal.logicalX - base.logicalX === 0 ? 0 : 1
            }

            if (diffInsideY > 1 || diffInsideY < -1) {
                return 3
            }

            if (diffInsideY === 1 || diffInsideY === -1) {
                return 2
            }
        }

        if (diffY === 1) {
            return Math.min(terminal.insideY + base.maxInsideY - base.insideY + 2, 3)
        }

        if (diffY === -1) {
            return Math.min(base.insideY + terminal.maxInsideY - terminal.insideY + 2, 3)
        }
    }
}

module.exports = Selection
