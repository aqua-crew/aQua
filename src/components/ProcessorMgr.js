const { DOM, SpecialCharSet } = require('../utils/index')

class ProcessorMgr {
    constructor(aqua) {
        this.aqua = aqua
        this.registry = Object.create(null)
    }

    tokenize(asset, options, cb) {

    }

    transformToElements(line, fileType = this.aqua.optionMgr.get('ext')) {
        const $root = DOM.f()

        if (line.length === 0) {
            DOM.appendChild($root, DOM.e('span', {'class': 'aqua-block-empty'}))

            return $root
        }

        this.traverse(line.data, (data, type) => {
            const processor = this.get(type)
            const tokens = processor.tokenize(data, fileType)

            processor.toElementsAndMount(tokens, $root, line)
        })

        return $root
    }

    get(type) {
        return this.registry[type]
    }

    traverse(asset, cb) {
        const type = asset.type || 'string'

        if (type === 'string') {
            cb(asset, type)

            return
        }

        for (; asset !== null; asset = asset.next) {
            cb(asset.data, asset.type)
        }
    }

    load(Processor) {
        const processor = new Processor(this.aqua.docWatcher, this.aqua.korwa)
        const targets = processor.targets

        for (let i = 0; i < targets.length; i++) {
            const target = targets[i]

            this.registry[target] = processor
        }
    }
}

module.exports = ProcessorMgr
