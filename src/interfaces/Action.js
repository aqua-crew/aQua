class Action {
    constructor() {
        this.name = null
        this.desc = null
        this.cmd = null
        this.icons = null
        this.tags = [] // 用于分类
        this.shortcuts = []
        this.eventType = 'keyboard' // or 'mouse'
        this.track = false
        this.before = true
        this.after = true
    }

    exec() {}

    undo() {}

    redo() {}
}

module.exports = Action
