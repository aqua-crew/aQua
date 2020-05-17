const { Pool } = require('../interfaces/index')

class LinePool extends Pool {
    constructor(lineMgr) {
        super()

        this.lineMgr = lineMgr
        this.pool = []
        this.idlePool = []
    }

    init(count) {
        this.put(0, this.get(count))
    }

    /**
     * 闲置指定行
     * @param  {Number} start [起始行 包含]
     * @param  {Number} end [终止行 包含]
     */
    idle(start = 0, end = this.pool.length - 1) {
        if (end < start) {
            return
        }

        const $lines = this.pool.splice(start, end + 1 - start)

        for (let i = 0; i < $lines.length; i++) {
            const $line = $lines[i]
            $line.remove()
            this.idlePool.push($line)
        }
    }

    idleAll() {
        this.idlePool = this.idlePool.concat(this.pool)
        this.pool = []
    }

    unmountIdlePool() {
        const idlePool = this.idlePool

        for (let i = 0; i < idlePool.length; i++) {
            idlePool[i].remove()
        }
    }

    search(index) {
        return this.pool[index]
    }

    create() {
        return this.lineMgr.create()
    }

    get(count) {
        let $lines = []

        const idlePool = this.idlePool
        const idleLen = idlePool.length

        if (count >= idleLen) {
            $lines = idlePool

            count = count - idleLen
            this.idlePool = []
        } else {
            while (count--) {
                $lines.push(idlePool.pop())
            }

            return $lines
        }

        while (count--) {
            $lines.push(this.create())
        }

        return $lines
    }

    put(start, $lines) {
        if (start === 0) {
            this.pool = $lines.concat(this.pool)

            return
        }

        if (start >= this.pool.length) {
            this.pool = this.pool.concat($lines)

            return
        }

        this.pool.splice(start, $lines)
    }

    clear() {
        this.idleAll()
    }
}

module.exports = LinePool
