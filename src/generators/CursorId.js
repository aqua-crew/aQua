class CursorId {
    constructor({
        id = 0
    } = {}) {
        this.id = id
    }

    add(id, options) {
        return this.id + 1
    }

    generate(options) {
        this.id = this.add(this.id, options)
        return this.id
    }
}

module.exports = CursorId
