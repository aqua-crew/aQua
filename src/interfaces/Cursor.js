class Cursor {
    constructor() {
        this.tags = []
        this.name = this.constructor.name
        this.desc = ''
        this.state = Object.create(null)
    }

    release() {}
    create() {}
}

module.exports = Cursor
