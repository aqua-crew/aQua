class Asset {
    constructor(data = null, type = null, prev = null, next = null) {
        this.data = data
        this.type = type
        this.prev = prev
        this.next = next
    }

    get length() {
        return this.data.length
    }

    get head() {
        return this.prev ? this.prev.head : this
    }

    get tail() {
        return this.next ? this.next.tail : this
    }

    getAlive() {
        if (this.length > 0) {
            return this
        }

        return this.next ? this.next.isAlive() : null
    }

    isEmpty() {
        return this.length === 0
    }

    setPrev(prev) {
        this.prev = prev

        if (!prev) {
            return this
        }

        prev.last = this

        return prev
    }

    setHead(prev) {
        return this.head.setPrev(prev)
    }

    setNext(next) {
        this.next = next

        if (!next) {
            return this
        }

        next.prev = this

        return next
    }

    setTail(next) {
        return this.tail.setNext(next)
    }

    /* Override Request, x > 0 */
    insert(content, x) {}
    /* Override Request */
    delete(start, end) {}
    /* Override Request */
    get(start, end) {}
    /* Override */
    toString() {
        return ''
    }
}

module.exports = Asset
