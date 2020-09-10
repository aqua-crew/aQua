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

    useOffsetUpdater() {
        let offsetY = 0
        let offsetX = 0

        return {
            setY(y) {
                offsetY = y
            },

            setX(x) {
                offsetX = x
            },

            flush(start) {
                return {
                    y: offsetY,
                    x: offsetX,
                }
            },
        }
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

    updateOffset(offsetCoord, lastY) {
        if (offsetCoord.y === 0 && offsetCoord.x === 0) {
            return
        }

        // console.log('before Update', this.coord.clone(), JSON.parse(JSON.stringify(offsetCoord)), this.x)

        this.y = this.y + offsetCoord.y
        this.x = this.y === lastY ? offsetCoord.x + this.x : this.x

        // console.log('lastY, this.y', lastY, this.y)
        // console.log('offsetCoord.x, this.x', offsetCoord.x)
        // console.log('Update', this.coord.clone())

        if (this.selection.isCollapsed()) {
            return
        }

        const coord = this.coord.clone()
        const selection = this.selection
        const direction = selection.direction

        if (direction === ArgOpt.SelectionDirectionIsBottomRight) {
            this.y = selection.start.y + offsetCoord.y
            this.x = this.y === lastY ? selection.start.x + offsetCoord.x : selection.start.x

            selection.base = this.coord.clone()
            selection.terminal = coord.clone()
        } else if (direction === ArgOpt.SelectionDirectionIsTopLeft) {
            this.y = selection.end.y + offsetCoord.y
            this.x = this.y === lastY ? selection.end.x + offsetCoord.x : selection.end.x

            selection.base = this.coord.clone()
            selection.terminal = coord.clone()
        }

        this.coord = coord.clone()
    }

    /* Extract */
    extract() {
        const data = Object.create(null)

        data.coord = this.coord.extract()
        data.selection = this.selection.extract()

        return data
    }

    rebuild(data) {
        const { coord, selection } = data

        if (selection) {
            this.y = selection.base.y
            this.x = selection.base.x

            this.selection.base = this.coord.clone()

            this.y = selection.terminal.y
            this.x = selection.terminal.x

            this.selection.terminal = this.coord.clone()
        }

        this.y = coord.y
        this.x = coord.x
    }
}

module.exports = Anchor
