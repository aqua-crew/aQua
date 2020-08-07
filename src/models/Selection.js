const Coord = require('./Coord')
const { ArgOpt } = require('../enums/index')

class Selection {
    constructor() {
        this._base = new Coord

        this.start = new Coord
        this.end = new Coord

        this.direction = ArgOpt.SelectionDirectionIsNone
        this.collapsed = true
    }

    set base(coord) {
        this._base.assign(coord)
    }

    get base() {
        return this._base
    }

    set terminal(coord) {
        this.reorder(this._base, coord)
    }

    isCollapsed() {
        return this.collapsed
    }

    isContainCoord(coord) {
        if (coord.y < this.start.y) {
            return false
        }

        if (coord.y > this.end.y) {
            return false
        }

        if (coord.x < this.start.x) {
            return false
        }

        if (coord.x > this.end.x) {
            return false
        }

        return true
    }

    reorder(base, terminal) {
        this.collapsed = false

        const diffY = terminal.y - base.y

        if (diffY > 0) {
            this.setStart(base)
            this.setEnd(terminal)

            this.direction = ArgOpt.SelectionDirectionIsBottomRight

            return
        }

        if (diffY < 0) {
            this.setStart(terminal)
            this.setEnd(base)

            this.direction = ArgOpt.SelectionDirectionIsTopLeft

            return
        }

        const diffX = terminal.x - base.x

        if (diffX > 0) {
            this.setStart(base)
            this.setEnd(terminal)

            this.direction = ArgOpt.SelectionDirectionIsBottomRight

            return
        }

        if (diffX < 0) {
            this.setStart(terminal)
            this.setEnd(base)

            this.direction = ArgOpt.SelectionDirectionIsTopLeft

            return
        }

        this.direction = ArgOpt.SelectionDirectionIsNone
        this.collapsed = true
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

    reset() {
        this._base = new Coord

        this.start = new Coord
        this.end = new Coord

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

    clone() {
        const selection = new Selection

        selection._base = this._base.clone()
        selection.start = this.start.clone()
        selection.end = this.end.clone()
        selection.direction = this.direction
        selection.collapsed = this.collapsed

        return selection
    }

    /**
     * 请保证 selection 与当前 selection 重合再调用此方法
     * @param  {Selection} selection
     */
    merge(selection) {
        if (selection.collapsed) {
            return
        }

        this.collapsed = selection.collapsed
        const direction = selection.direction

        if (direction === ArgOpt.SelectionDirectionIsBottomRight) {
            if (selection.base.less(this.base)) {
                this.base = selection.base
            }
        } else if (direction === ArgOpt.SelectionDirectionIsTopLeft) {
            if (selection.base.greater(this.base)) {
                this.base = selection.base
            }
        }

        if (selection.start.less(this.start)) {
            this.start.assign(selection.start)
        }

        if (selection.end.greater(this.end)) {
            this.end.assign(selection.end)
        }
    }

    extract() {
        const direction = this.direction

        if (direction === ArgOpt.SelectionDirectionIsNone) {
            return null
        }

        if (direction === ArgOpt.SelectionDirectionIsTopLeft) {
            return {
                base: this.end.extract(),
                terminal: this.start.extract(),
            }
        }

        if (direction === ArgOpt.SelectionDirectionIsBottomRight) {
            return {
                base: this.start.extract(),
                terminal: this.end.extract(),
            }
        }
    }
}

module.exports = Selection
