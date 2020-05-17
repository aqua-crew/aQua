class SizeObserver {
    constructor() {
        this.map = new Map

        this.resizeObserver = new ResizeObserver(entries => {
            for (let i = 0; i < entries.length; i++) {
                const entry = entries[i]
                const cb = this.map.get(entry.target)
                cb && cb(entry)
            }
        })
    }

    observe($ele, cb = null) {
        this.map.set($ele, cb)
        this.resizeObserver.observe($ele)
    }

    unobserve($ele) {
        this.map.delete($ele)
        this.resizeObserver.unobserve($ele)
    }

    disconnect() {
        this.map.clear()
        this.resizeObserver.disconnect()
    }
}

module.exports = SizeObserver
