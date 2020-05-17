class Cursor {
    constructor() {
        this.coord = new Coord
        this.layout = new Coord
        this.selection = new Selection
        this.status = Object.create(null)
        this.filter = null
    }

    set y(y) {
        this.coord.y = y
    }
    get y() {
        return this.coord.y
    }
    set x(x) {
        this.coord.x = x
    }
    get x() {
        return this.coord.x
    }

    set $y($y) {
        this.layout.y = $y
    }
    get $y(y) {
        return this.layout.y
    }
    set $x($x) {
        this.layout.x = $x
    }
    get $x() {
        return this.layout.x
    }

    updateCoord() {

    }

    $updateCoord() {

    }
}

module.exports = Cursor
