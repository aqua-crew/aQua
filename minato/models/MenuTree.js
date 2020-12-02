class MenuTree {
    constructor() {
        this.root = null
        this.type = ''
    }

    create(menuitem, to) {

    }
}

class MenuItem {
    constructor() {
        this.id = null
        this.name = ''
        this.ext = ''
        this.isFolder = false
        this.createTime = 0
        this.updateTime = 0
        this.deleteTime = 0
        this.children = null
    }
}

module.exports = MenuTree
