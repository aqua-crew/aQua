class ActionMgr {
    constructor(aqua) {
        this.aqua = aqua

        this.lastAction = null
        this.actions = Object.create(null)
    }

    exec(name, ...payload) {
        return this.actions[name].exec(this.aqua, ...payload)
    }

    load(Action) {
        const instance = new Action
        this.actions[instance.name] = instance

        for (let i = 0; i < instance.shortcuts.length; i++) {
            const shortcut = instance.shortcuts[i]

            this.aqua.kizuna.load(shortcut, (event, payload) => {
                instance.exec(this.aqua, event, payload)
            }, instance.eventType)
        }
    }
}

module.exports = ActionMgr
