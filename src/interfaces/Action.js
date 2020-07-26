class Action {
    constructor() {
        this.name = null
        this.desc = null
        this.cmd = null
        this.icons = null
        this.tags = [] // 用于分类
        this.shortcuts = []
        this.eventType = 'keyboard' // or 'mouse'
        this.customMerge = false
        this.record = true
    }

    exec() {}

    undo() {}
    redo() {}

    merge() {}
}

module.exports = Action
