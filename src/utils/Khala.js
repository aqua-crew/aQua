class Khala {
    constructor(events = Object.create(null)) {
        this.events = events
    }

    on(event, fn) {
        (this.events[event] || (this.events[event] = [])).push(fn)

        return this
    }

    off(event, fn) {
        if (arguments.length === 0) {
            this.events = Object.create(null)
            return this
        }

        const cbs = this.events[event]
        if (!cbs) {
            return this
        }

        if (!fn) {
            this.events[event] = null
            return this
        }

        for (let i = 0; i < cbs.length; i++) {
            if (cbs[i] === fn) {
                cbs.splice(i, i)
                break
            }
        }

        return this
    }

    emit(event, ...args) {
        const cbs = this.events[event]
        if (cbs) {
            for (let i = 0; i < cbs.length; i++) {
                cbs[i].apply(null, args)
            }
        } else {
            console.warn(`event ${event} is not exist`)
        }
    }

    once(event, fn) {
        const on = (...args) => {
            this.off(event)
            fn.apply(null, args)
        }

        this.on(event, on)

        return this
    }
}

module.exports = Khala
