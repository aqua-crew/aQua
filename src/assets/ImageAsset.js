const { Asset } = require('../interfaces/index')

/**
 * data: {
 *     src: '',
 *     alt: '',
 * }
 */
class ImageAsset extends Asset {
    constructor(data, prev, next) {
        super(data, 'ImageAsset', prev, next)
    }

    get length() {
        return this.data ? 1 : 0
    }

    insert(asset, x) {
        asset.setTail(this.next)
        this.setNext(asset)
    }

    delete(start, end) {
        const len = this.length

        if (start === len) {
            return this.next.delete(0, end - len)
        }

        if (end <= len) {
            return this._delete()
        }

        const returnContent = this._delete()
        returnContent.setNext(this.next.delete(0, end - len))

        if (this.next.isEmpty()) {
            this.setNext(this.next.next)
        }

        return returnContent
    }

    get(start, end = this.length) {
        return new ImageAsset(this.data)
    }

    /* Private */
    _delete() {
        const deleteData = this.data
        this.data = null

        return new ImageAsset(deleteData)
    }
}

module.exports = ImageAsset
