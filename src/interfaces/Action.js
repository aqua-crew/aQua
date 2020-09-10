const { ActionEventType } = require('../enums/index')

class Action {
    constructor() {
        this.name = null
        this.shortcuts = []
        this.eventType = ActionEventType.Keyboard
        this.customMerge = false
        this.record = true
    }

    exec() {}

    undo() {}
    redo() {}

    merge() {}
}

module.exports = Action
