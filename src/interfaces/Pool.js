class Pool {
    constructor(Recycle) {
        this.pool = []
        this.Recycle = Recycle
    }

    get size() {
        return this.pool.length
    }

    create(...payload) {}
    get(...payload) {}
    put(recycle) {}
    clear() {}
}

module.exports = Pool
