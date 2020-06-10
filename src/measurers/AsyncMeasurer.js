class AsyncMeasurer {
    constructor(aqua, extend) {
        this.aqua = aqua

        this.$asyncMeasurers = Object.create(null)

        extend(this.getMeasurer.bind(this))
    }

    getMeasurer(key, lineOrData, modName) {
        const $asyncMeasurers = this.$asyncMeasurers
        let measurer = $asyncMeasurers[key]

        if (measurer) {
            return measurer
        }

        const $measure = this.createMeasure(modName)

        measurer = function() {
            const height = $measure.getBoundingClientRect().height
            console.error('measure', height)
            delete $asyncMeasurers[key]
            // $measure.remove()

            return height
        }

        $asyncMeasurers[key] = measurer

        DOM.appendChild($measure.children[1].firstChild, this.aqua.processorMgr.transformToElements(lineOrData))

        return measurer
    }
}

module.exports = AsyncMeasurer
