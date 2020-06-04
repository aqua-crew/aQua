class Coord {
    constructor({
        y = 0,
        insideY = 0,
        maxInsideY = 0,
        x = 0,
    } = {}) {
        this.y = y
        this.insideY = insideY
        this.maxInsideY = maxInsideY
        this.x = x
    }

    assign(coord) {
        this.y = coord.y
        this.x = coord.x
        this.insideY = coord.insideY
        this.maxInsideY = coord.maxInsideY
    }

    clone() {
        return new Coord({
            y: this.y,
            x: this.x,
            insideY: this.insideY,
            maxInsideY: this.maxInsideY,
        })
    }

    reset({
        y = 0,
        x = 0,
    } = {}) {
        this.y = y
        this.x = x
    }

    extract() {
        const coord = Object.create(null)

        coord.y = this.y
        coord.x = this.x
        coord.insideY = this.insideY
        coord.maxInsideY = this.maxInsideY

        return coord
    }

    greater(coord, equal = false) {
        const diffY = this.y - coord.y

        if (diffY > 0) {
            return true
        }

        if (diffY < 0) {
            return false
        }

        const diffX = this.x - coord.x

        if (diffX > 0) {
            return true
        }

        if (diffX < 0) {
            return false
        }

        return equal
    }

    less(coord, equal = false) {
        const diffY = this.y - coord.y

        if (diffY < 0) {
            return true
        }

        if (diffY > 0) {
            return true
        }

        const diffX = this.x - coord.x

        if (diffX < 0) {
            return true
        }

        if (diffX > 0) {
            return false
        }

        return equal
    }

    equal(coord) {
        return this.y === coord.y && this.x === coord.x
    }
}

module.exports = Coord
