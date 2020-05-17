class Chunk {
    constructor({
        parent = null,
        children = [],
        size = 0,
        height = 0,
        status = null,
        tag = null,
        level = 0,
        chunkVolume = 20,
        volume = 128,
    } = {}) {
        this._size = 0
        this.parent = parent
        this.children = children
        this.size = size
        this.height = height
        this.status = status
        this.tag = tag
        this.level = level
        this.chunkVolume = chunkVolume
        this.volume = volume
    }

    get(index) {
        return this.children[index]
    }

    set size(s) {
        if (this.level === 0) {
            return
        }

        this._size = s
    }

    get size() {
        return this.level === 0 ? this.children.length : this._size
    }

    get length() {
        return this.children.length
    }

    bubble(cb) {
        if (cb(this) === false) {
            return null
        }

        return this.parent !== null ? this.parent.bubble(cb) : null
    }

    clone(options = {}) {
        return new Chunk({
            parent: this.parent,
            children: [],
            size: 0,
            height: 0,
            status: this.status,
            tag: this.tag,
            level: this.level,
            chunkVolume: this.chunkVolume,
            volume: this.volume,
            ...options,
        })
    }

    splice(start, deleteCount, items = null) {
        if (items !== null) {
            return this.children.splice(start, deleteCount, ...items)
        } else {
            return this.children.splice(start, deleteCount)
        }
    }

    /**
     * 不检测 parent 的存在，请求前必须保证 parent 的存在
     * @return {number} 自身在 parent 中的 index
     */
    selfIndex() {
        return this.parent.children.indexOf(this)
    }
}

module.exports = Chunk
