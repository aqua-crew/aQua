class Node {
    constructor() {
        this.prev = prev
        this.next = next
        this.data = data
    }

    release() {
        this.prev = null
        this.next = null
        this.data = null
    }
}

class DoublyLinkedList {
    constructor(head = null, tail = null, volume = 16) {
        this.head = null
        this.tail = null
        this.volume = volume

        this._size = 0
    }

    get size() {
        return this._size
    }

    insert(index, node) {

    }

    delete(node) {
        const prev = node.prev
        const next = node.next

        if (prev) {
            prev.next = next
        } else {
            this.head = next
        }

        if (next) {
            next.prev = prev
        } else {
            this.tail = prev
        }

        node.release()

        return this
    }

    traverse(cb, start = this.head) {
        if (start === this.head) {
            this.traverseFromHead(cb, start)

            return
        }

        if (start === this.tail) {
            this.traverseFromTail(cb, start)

            return
        }

        // #Error
    }

    traverseFromHead(cb, node) {
        cb(node.data, node)

        node.next && this.traverseFromHead(cb, node.next)
    }

    traverseFromTail(cb, node) {
        cb(node.data, node)

        node.prev && this.traverseFromTail(cb, node.prev)
    }
}

class CursorChain {
    constructor(chains = [new DoublyLinkedList]) {
        this.chains = chains
        this.buffer = []
    }

    isInsertable(current) {

    }

    insert(current) {
        const coord = current.coord

        this.traverse(chain => {
            // 找到合适的 chain
            if (coord.less(chain.tail.coord)) {

                chain.traverse(cursor => {

                })

            }
        })
    }

    delete(cursor) {

    }

    traverse(cb, chains = this.chains) {
        for (let i = 0; i < chains.length; i++) {
            if (cb(chains[i])) {
                return
            }
        }
    }

    resort(cursor) {

    }
}

module.exports = CursorChain
