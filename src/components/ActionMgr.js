class ActionMgr {
    constructor(aqua) {
        this.aqua = aqua
        this.chronicle = aqua.chronicle

        this.actions = Object.create(null)
    }

    exec(name, ...payload) {
        const instance = this.get(name)

        return instance.exec(this.aqua, ...payload)
    }

    execWithName(name, fnName, ...payload) {
        const instance = this.get(name)

        return instance[fnName](this.aqua, ...payload)
    }

    get(name) {
        return this.actions[name]
    }

    load(Action) {
        const instance = new Action
        const customMerge = instance.customMerge ? instance.merge : null

        this.actions[instance.name] = instance

        for (let i = 0; i < instance.shortcuts.length; i++) {
            const shortcut = instance.shortcuts[i]

            if (instance.record) {
                this.aqua.kizuna.load(shortcut, (event, payload) => {
                    const name = instance.name

                    this.chronicle.start(name, this.aqua.cursorMgr.getCursorsCoord())
                    instance.exec(this.aqua, event, payload)
                    this.chronicle.end(name, this.aqua.cursorMgr.getCursorsCoord(), customMerge)
                }, instance.eventType)
            } else {
                this.aqua.kizuna.load(shortcut, (event, payload) => {
                    const name = instance.name

                    instance.exec(this.aqua, event, payload)
                }, instance.eventType)
            }
        }
    }
}

module.exports = ActionMgr
