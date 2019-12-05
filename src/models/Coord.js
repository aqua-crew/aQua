class Coord {
    constructor({
        logicalY = 0,
        logicalX = 0,
        physicalY = 0,
        physicalX = 0,
        insideY = 0,
        maxInsideY = 0,
    } = {}) {
        this.logicalY = logicalY
        this.logicalX = logicalX
        this.physicalY = physicalY
        this.physicalX = physicalX
        this.insideY = insideY
        this.maxInsideY = maxInsideY
    }

    assign(coord) {
        this.logicalY = coord.logicalY
        this.logicalX = coord.logicalX
        this.physicalY = coord.physicalY
        this.physicalX = coord.physicalX
        this.insideY = coord.insideY
        this.maxInsideY = coord.maxInsideY
    }

    clone() {
        return new Coord({
            logicalY: this.logicalY,
            logicalX: this.logicalX,
            physicalY: this.physicalY,
            physicalX: this.physicalX,
            insideY: this.insideY,
            maxInsideY: this.maxInsideY,
        })
    }

    greater(coord, equal = false) {
        const diffY = this.logicalY - coord.logicalY

        if (diffY > 0) {
            return true
        }

        if (diffY < 0) {
            return false
        }

        const diffX = this.logicalX - coord.logicalX

        if (diffX > 0) {
            return true
        }

        if (diffX < 0) {
            return false
        }

        return equal
    }

    less(coord, equal = false) {
        const diffY = this.logicalY - coord.logicalY

        if (diffY < 0) {
            return true
        }

        if (diffY > 0) {
            return true
        }

        const diffX = this.logicalX - coord.logicalX

        if (diffX < 0) {
            return true
        }

        if (diffX > 0) {
            return false
        }

        return equal
    }

    equal(coord) {
        return this.logicalY === coord.logicalY && this.logicalX === coord.logicalX
    }
}

module.exports = Coord
