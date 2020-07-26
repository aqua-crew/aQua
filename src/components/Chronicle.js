const { MacroStep, MicroStep } = require('../models/index')
const { ChronicleStatus } = require('../enums/index')

class Chronicle {
    constructor(aqua) {
        this.khala = aqua.khala

        this.backMacroEvents = []
        this.macroEvents = []
        this.microEvents = []

        this.status = ChronicleStatus.Pending

        this.options = {
            mergeDisabled: false,
            mergeTimeout: 1500,
        }
    }

    init() {
        this.khala.on('microEvent', data => {
            this.record(data)
        })
    }

    record(data) {
        if (this.status !== ChronicleStatus.Recording) {
            return
        }

        this.microEvents.push(new MicroStep(data))
    }

    start(type) {
        this.status = ChronicleStatus.Recording
    }

    end(type, merge = this.merge) {
        this.status = ChronicleStatus.Pending

        if (this.microEvents.length === 0) {
            return
        }

        if (this.backMacroEvents.length > 0) {
            this.backMacroEvents = []
        }

        const macro = new MacroStep(type, this.flushMicros())

        if (this.macroEvents.length < 1) {
            this.macroEvents.push(macro)

            return
        }

        if (!merge) {
            merge = this.merge
        }

        merge(macro, this, this.mergeStrategy) || this.macroEvents.push(macro)
    }

    flushMicros() {
        const micros = this.microEvents

        this.microEvents = []

        return micros
    }

    merge(next, chronicle, mergeStrategy) {
        return

        const macros = chronicle.macroEvents
        const len = macros.length
        const prev = macros[len - 1]

        if (mergeStrategy(next, prev, chronicle.options)) {
            return false
        }

        return false

        const mergedMicros = []

        const prevMicros = prev.micros
        const nextMicros = next.micros

        let prevIndex = 0
        let nextIndex = 0

        while(true) {
            const prevMicro = prevMicros[prevIndex]
            const nextMicro = nextMicros[nextIndex]

            if (nextMicro < prevMicro) {
                mergedMicros.push(nextMicro)
                nextIndex = nextIndex + 1

                continue
            }
        }
    }

    mergeStrategy(next, prev, options) {
        if (options.mergeDisabled) {
            return false
        }

        // if (next.author !== prev.author) {
        //     return false
        // }

        if (next.type !== prev.type) {
            return false
        }

        if (next.updateTime - prev.createdTime > options.mergeTimeout) {
            return false
        }

        return true
    }

    back(fn) {
        const macroEvent = this.macroEvents.pop()

        if (!macroEvent) {
            return fn(macroEvent)
        }

        this.backMacroEvents.push(macroEvent)

        return fn(macroEvent)
    }

    forward(fn) {
        const macroEvent = this.backMacroEvents.pop()

        if (!macroEvent) {
            return fn(macroEvent)
        }

        this.macroEvents.push(macroEvent)

        return fn(macroEvent)
    }
}

module.exports = Chronicle
