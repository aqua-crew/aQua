const { MacroStep, MicroStep } = require('../models/index')

class Chronicle {
    constructor(aqua) {
        this.khala = aqua.khala

        this.backMacroEvents = []
        this.forwardMacroEvents = []

        this.options = {
            mergeDisabled: false,
            mergeTimeout: 1500,
        }

        this.currentMacroEvent = null
    }

    init() {
        this.khala.on('microEvent', data => {
            this.record(data)
        })
    }

    record(data) {
        if (!this.currentMacroEvent) {
            return
        }

        this.currentMacroEvent.micros.push(new MicroStep(data))
    }

    start(type, before = null) {
        const macro = new MacroStep(type)

        macro.micros = []
        macro.before = before

        this.currentMacroEvent = macro
    }

    end(type, after = null, merge = this.merge) {
        const macro = this.currentMacroEvent

        if (!macro) {
            return
        }

        macro.after = after

        if (macro.micros.length === 0) {
            this.currentMacroEvent = null

            return
        }

        this.currentMacroEvent = null

        if (this.backMacroEvents.length > 0) {
            this.backMacroEvents = []
        }

        if (this.forwardMacroEvents.length < 1) {
            this.forwardMacroEvents.push(macro)

            return
        }

        if (!merge) {
            merge = this.merge
        }

        merge(macro, this, this.mergeStrategy) || this.forwardMacroEvents.push(macro)
    }

    merge(next, chronicle, mergeStrategy) {
        // console.log('Merge', chronicle.forwardMacroEvents)

        return

        const macros = chronicle.forwardMacroEvents
        const len = macros.length
        const prev = macros[len - 1]

        if (mergeStrategy(next, prev, chronicle.options)) {
            return false
        }

        return

        const mergedMicros = []

        const prevMicros = prev.micros
        const nextMicros = next.micros

        let prevIndex = 0
        let nextIndex = 0

        while(true) {
            const prevMicro = prevMicros[prevIndex]
            const nextMicro = nextMicros[nextIndex]

            if (prevMicro.source === prevMicro.source) {

            }

            if (nextMicro < prevMicro) {
                mergedMicros.push(nextMicro)
                nextIndex = nextIndex + 1

                continue
            }
        }

        prev.updateTime = prev.getTime()

        const mergeMicros = (prevMicros, nextMicros) => {
            const merged = []

            let prevIndex = 0
            let nextIndex = 0

            return

            while(true) {
            }
        }
    }

    mergeStrategy(next, prev, options) {
        if (options.mergeDisabled) {
            return false
        }

        if (next.author !== prev.author) {
            return false
        }

        if (next.type !== prev.type) {
            return false
        }

        if (next.updateTime - prev.createdTime > options.mergeTimeout) {
            return false
        }

        return true
    }

    back(fn) {
        const macroEvent = this.forwardMacroEvents.pop()

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

        this.forwardMacroEvents.push(macroEvent)

        return fn(macroEvent)
    }
}

module.exports = Chronicle
