class ActionMgr {
    constructor(aqua) {
        this.aqua = aqua

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

            // if (instance.before && instance.after) {
            //     this.aqua.kizuna.load(shortcut, (event, payload) => {
            //         this.aqua.khala.emit('actionBefore', instance.name, payload)
            //         instance.exec(this.aqua, event, payload)
            //         this.aqua.khala.emit('actionAfter', instance.name, payload)
            //     }, instance.eventType)

            //     continue
            // }

            // if (instance.before) {
            //     this.aqua.kizuna.load(shortcut, (event, payload) => {
            //         this.aqua.khala.emit('actionBefore', instance.name, payload)
            //         instance.exec(this.aqua, event, payload)
            //     }, instance.eventType)

            //     continue
            // }

            // if (instance.after) {
            //     this.aqua.kizuna.load(shortcut, (event, payload) => {
            //         instance.exec(this.aqua, event, payload)
            //         this.aqua.khala.emit('actionAfter', instance.name, payload)
            //     }, instance.eventType)

            //     continue
            // }

            this.aqua.kizuna.load(shortcut, (event, payload) => {
                instance.exec(this.aqua, event, payload)
            }, instance.eventType)
        }
    }
}

module.exports = ActionMgr
