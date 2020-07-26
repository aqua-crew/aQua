const { Coord, Selection } = require('../models/index')
const { ArgOpt } = require('../enums/index')

class Anchor {
    constructor(aqua) {
        this.docMgr = aqua.docMgr
        this.locator = aqua.locator

        this.effect = new Coord().extract()

        this.coord = new Coord
        this.layout = new Coord
        this.selection = new Selection

        this.filter = null

        this.status = Object.create(null)
    }

    set y(y) {
        this.coord.y = this.docMgr.correctLineNum(y)
        this.coord.maxInsideY = this.locator.getMaxInsideYByY(y)
    }

    get y() {
        return this.coord.y
    }

    set x(x) {
        this.coord.x = Math.min(x, this.docMgr.getLine(this.coord.y).length)
        this.coord.insideY = this.locator.getInsideYByCoord(this.coord.y, this.coord.x)
    }

    get x() {
        return this.coord.x
    }

    set $y($y) {
        const { y, insideY, maxInsideY } = this.locator.getYByLayoutY($y)

        this.coord.y = y
        this.coord.insideY = insideY
        this.coord.maxInsideY = maxInsideY
    }

    get $y() {
        return this.layout.y
    }

    set $x($x) {
        const x = this.locator.getXByLayoutX(this.coord.y, this.coord.insideY, $x)

        this.coord.x = x
    }

    get $x() {
        return this.layout.x
    }

    set insideY(insideY) {
        this.coord.insideY = insideY
        this.$x = this.$x
    }

    get insideY() {
        return this.coord.insideY
    }

    get maxInsideY() {
        return this.coord.maxInsideY
    }

    resetSelection() {
        this.selection.base = this.coord.clone()
        this.selection.terminal = this.coord.clone()
    }

    moveToSelectionStart() {
        this.coord = this.selection.start.clone()
    }

    moveToSelectionEnd() {
        this.coord = this.selection.end.clone()
    }

    updateLayout() {
        const layout = this.locator.getLayoutByCoord(this.y, this.x, this.insideY !== this.maxInsideY ? this.insideY : null)

        this.layout.y = layout.y
        this.layout.x = layout.x

        return layout
    }

    merge(cursor) {
        this.selection.merge(cursor.selection)

        if (this.selection.direction === ArgOpt.SelectionDirectionIsBottomRight) {
            this.coord.assign(this.selection.end)
        } else if (this.selection.direction === ArgOpt.SelectionDirectionIsTopLeft) {
            this.coord.assign(this.selection.start)
        }
    }
}

module.exports = Anchor
