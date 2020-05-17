class Pool {
    constructor(Recycle) {
        this.pool = []
        this.Recycle = Recycle
    }

    get size() {
        return this.pool.length
    }

    create(...payload) {
        const recycle = new this.Recycle
        recycle.onCreate(...payload)

        return recycle
    }

    get(...payload) {
        const recycle = this.pool.pop()

        if (!recycle) {
            return null
        }

        recycle.reuse(...payload)
        return recycle
    }

    put(recycle) {
        this.pool.push(recycle)
        recycle.unuse()
    }

    clear() {
        for (let i = 0; i < this.pool.length; i++) {
            const recycle = this.pool[i]
            recycle.onDestroy()
        }
    }
}

module.exports = Pool
