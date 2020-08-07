const { Asset } = require('../interfaces/index')

class FolderAsset extends Asset {
    constructor(data, prev, next) {
        super(data, 'FolderAsset', prev, next)
    }

    insert(asset, x) {

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
