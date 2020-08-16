const { MacroStep, MicroStep } = require('../models/index')
const { CoordHelper, AssetHelper } = require('../helpers/index')

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

        const micros = this.currentMacroEvent.micros
        const prev = micros[micros.length - 1]
        const next = new MicroStep(data)

        if (!prev) {
            this.currentMacroEvent.micros.push(next)

            return
        }

        const isMerged = this.mergeMicro(prev, next)

        isMerged || this.currentMacroEvent.micros.push(next)
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

    /**
     * 如果存在连续的坐标但是中间夹了不同 source 的 microStep, 由于情况较少, 且需要做额外的处理, 不处理这种情况.
     * 1. 前后的类型不同, 不合并
     * 2. 前后的起始坐标不同, 不合并
     * 3. 合并坐标以及内容
     *     3.1 如果后一个 macro 的影响行数只有1, 那么合并后的内容会在前一个 macro 的最后一行的最后面, 所以需要加上 x
     * @param  {MicroStep}   prev []
     * @param  {MicroStep} next []
     * @return {Boolean}        [next 是否已经被合并]
     */
    mergeMicro(prev, next) {
        const prevRecord = prev.record
        const nextRecord = next.record

        /* 1 */
        if (prevRecord.source !== nextRecord.source) {
            return false
        }

        /* 2 */
        if (!CoordHelper.equal(prevRecord.start, nextRecord.start)) {
            return false
        }

        /* 3 */
        const prevContents = prevRecord.contents
        const nextContents = nextRecord.contents

        prevContents[prevContents.length - 1] = AssetHelper.append(prevContents[prevContents.length - 1], nextContents[0])

        const prevEnd = prevRecord.end

        if (nextContents.length < 2) {
            /* 3.1 */
            prevEnd.x = prevEnd.x + nextRecord.end.x - nextRecord.start.x
        } else {
            prevRecord.contents = prevContents.concat(nextContents.slice(1))

            prevEnd.y = prevEnd.y + nextRecord.end.y - nextRecord.start.y
            prevEnd.x = prevEnd.x + nextRecord.end.x - nextRecord.start.x
        }

        return true
    }

    /**
     * TODO: 需要考虑协同下的 merge 情况
     * 1. 过滤不需要 merge 的情况
     * @param  {Function} next          [description]
     * @param  {[type]}   chronicle     [description]
     * @param  {[type]}   mergeStrategy [description]
     * @return {[type]}                 [description]
     */
    merge(next, chronicle, mergeStrategy) {
        return

        // console.log('Merge', chronicle.forwardMacroEvents)

        // const macros = chronicle.forwardMacroEvents
        // const len = macros.length
        // const prev = macros[len - 1]

        // /* 1 */
        // if (!mergeStrategy(next, prev, chronicle.options)) {
        //     return false
        // }

        // let nextRecord = null
        // let yAcc = 0
        // let xAcc = 0

        // for (let i = 0; i < prev.length; i++) {
        //     const prevRecord = prev.record
        // }

        // prev.updateTime = prev.getTime()
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
