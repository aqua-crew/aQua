class CatalogueNode {
    constructor({
        type = null,
        name = '',
        ext = '',
        src = '',
        children = [],
        status = Object.create(null),
    } = {}) {
        this.type = type
        this.name = name
        this.ext = ext
        this.src = src
        this.children = children
        this.status = status
    }

    get filename() {
        const ext = this.ext.length > 0 ? '.' + this.ext : this.ext

        return this.name + ext
    }

    set filename(filename) {
        const words = filename.split('.')

        this.ext = words[words.length - 1]
        this.name = words.slice(0, words.length - 1).join('.')
    }
}

module.exports = CatalogueNode
