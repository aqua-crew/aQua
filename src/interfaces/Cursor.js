class Cursor {
    constructor() {
        this.tags = []
        this.name = this.constructor.name
        this.state = Object.create(null)
    }

    release() {}
    create() {}
    transform() {}
}

module.exports = Cursor
