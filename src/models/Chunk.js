const { Noop } = require('../utils/index')

class Chunk {
    constructor({
        type = 'chunk',
        parent = null,
        onCreated = Noop,
        onIncreased = Noop,
        onDecreased = Noop,
    } = {}) {
        this.type = type
        this._parent = null
        this._children = []
        this._size = 0

        this.onCreated = onCreated
        this.onIncreased = onIncreased
        this.onDecreased = onDecreased

        this.onCreated && this.onCreated(parent)
    }

    get children() {
        return this._children
    }

    get parent() {
        return this._parent
    }

    set parent(value) {
        if (this._parent === value) {
            return
        }

        this.parent && this.onMoved(value, this._parent)
        this._parent = value
    }

    set size(value) {
        if (this.type === 'chunk') {
            this._size = value
        } else {
            this.children.length = value
        }
    }

    get size() {
        return this.type === 'chunk' ? this._size : this.children.length
    }

    splice(offset = 1, deleteNum = 0, objs) {
        if (deleteNum > 0) {
            const deletes = this.getChildren(offset, offset + deleteNum)
            this.onDecreased(deletes)
        }

        if (objs.length > 0) {
            this.onIncreased(objs)
        }

        if (this.type === 'line') {
            return this.children.splice(offset, deleteNum, ...objs)
        }

        if (this.type === 'chunk') {
            const parentChildren = this.parent.children
            const index = parentChildren.indexOf(this)

            return parentChildren.splice(index + offset, deleteNum, ...objs)
        }
    }

    bubble(fn) {
        fn(this)

        return this.parent !== null ? this.parent.bubble(fn) : null
    }

    getChildren(start = 0, end = Infinity) {
        const children = []
        const len = this.children.length

        if (end > len) {
            end = len
        }

        for (let i = start; i < end; i++) {
            children.push(this.children[i])
        }

        return children
    }

    /* Once */
    init(chunks) {
        if (!Array.isArray(chunks)) {
            chunks = [chunks]
        }

        for (let i = 0; i < chunks.length; i++) {
            this.children.push(chunks[i])
        }
    }
}

module.exports = Chunk
