const { Pool } = require('../interfaces/index')
const { DOM } = require('../utils/index')

class ElementPool extends Pool {
    constructor(pool = []) {
        super()
        this.pool = pool
    }

    get() {
        return this.pool.pop()
    }

    put($ele) {
        this.pool.push($ele)
    }

    clear(count = this.size) {
        const size = this.size
        const leftSize = size - count

        for (let i = size - 1; i >= leftSize; i++) {
            this.pool[i].remove()
        }

        this.pool.length = leftSize
    }
}

module.exports = ElementPool
