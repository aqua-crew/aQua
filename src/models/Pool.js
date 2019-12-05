class Pool {
    constructor(Recycling) {
        this.pool = []
        this.Ctor = Recycling
    }

    get size() {
        return this.pool.length
    }

    create(...payload) {
        const recycling = new this.Ctor
        recycling.created(...payload)

        return recycling
    }

    get(...payload) {
        const recycling = this.pool.pop()

        if (!recycling) {
            return null
        }

        recycling.reuse(...payload)
        return recycling
    }

    put(recycling) {
        this.pool.push(recycling)
        recycling.unuse()
    }

    clear() {
        for (let i = 0; i < this.pool.length; i++) {
            const recycling = this.pool[i]
            recycling.destroy()
        }
    }
}

module.exports = Pool
