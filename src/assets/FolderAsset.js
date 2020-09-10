const { Asset } = require('../interfaces/index')

/**
 * data: {
 *     coord: {
 *         y<Number>,
 *         x<Number>,
 *     },
 *     contents<Asset | String>
 * }
 */
class FolderAsset extends Asset {
    constructor(data, prev, next) {
        super(data, 'FolderAsset', prev, next)
    }

    get length() {
        return this.data ? 1 : 0
    }

    insert(asset, x) {
        this.setNext(asset)
    }

    delete(start, end = this.length) {

    }

    get(start, end = this.length) {

    }

    toString() {
        return this.data
    }
}

module.exports = FolderAsset
