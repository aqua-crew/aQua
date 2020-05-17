class MenuItem {
    constructor(name, alias, children, hotKey) {
        this.name = name
        this.alias = null
        this.hotKey = hotKey
        this.children = null
    }

    sortChildren(cb) {
        this.children = cb(this.children)
    }
}

module.exports = MenuItem
