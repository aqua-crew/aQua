const { Asset } = require('../interfaces/index')

class StringAsset extends Asset {
    constructor(data, prev, next) {
        super(data, 'StringAsset', prev, next)
        this.max = 1024
    }

    setNext(next) {
        if (!next) {
            return this
        }

        if (this.type === next.type && this.length + next.length < this.max) {
            this.data = this.data + next.data

            return super.setNext(next.next)
        }

        return super.setNext(next)
    }

    /* Override */
    /**
     * 1. 见 @project/src/interfaces/Asset 的 search，理论上不会有 x === 0 的判断分支
     * @param  {String || Asset} asset
     * @param  {Number} x       [x > 0]
     */
    insert(asset, x) {
        const data = this.data
        const len = this.length

        if (typeof asset === 'string' || asset.type === this.type) {
            this.data = data.substring(0, x) + asset.data + data.substring(x, len)

            this._checkOverflow()
            return
        }

        /* 1 */
        if (x === 0) {
            asset.head.setPrev(this.prev)
            asset.setTail(this)
        } else if (x === len) {
            asset.setTail(this.next)
            this.setNext(asset.head)
        } else {
            const after = new StringAsset(data.substring(x, len))
            this.data = data.substring(0, x)

            after.setTail(this.next)
            asset.setTail(after)
            this.setNext(asset.head)
        }
    }

    delete(start, end = this.length) {
        const deleteData = this.data.substring(start, end)
        this.data = this.data.substring(0, start) + this.data.substring(end, this.length)

        return new StringAsset(deleteData)
    }

    get(start, end = this.length) {
        return new StringAsset(this.data.substring(start, end))
    }

    toString() {
        return this.data
    }

    /* Private */
    _checkOverflow() {
        if (this.length > this.max) {
            const half = parseInt(this.max / 2)
            const cs = new StringAsset(this.data.substring(half, this.length))

            this.data = this.data.substring(0, half)
            cs.setTail(this.next)
            this.setNext(cs)
        }
    }
}

module.exports = StringAsset

// 0123->#->@@@->456789
