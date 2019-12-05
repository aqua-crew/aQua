const { Plugin } = require('../interfaces/index')
const { Noop } = require('../utils/index')

class Scroller extends Plugin {
    constructor({
        offset = 0,
        formula = offset => this.offset + offset,
        offsetUpdated = Noop,
        viewportHeightUpdated = Noop,
        containerHeightUpdated = Noop,
    } = {}) {
        super()

        this.viewportHeight = 0
        this.containerHeight = 0
        this.sliderHeight = 0

        this.formula = formula
        this.offset = offset
    }

    updateOffset(offset) {
        this.offset = this.formula(offset)

        this.offsetUpdated(this.offset, offset)

        return this.offset
    }

    updateViewportHeight(viewportHeight) {
        this.viewportHeight = viewportHeight

        this.viewportHeightUpdated(this.viewportHeight, viewportHeight)

        return this.viewportHeight
    }

    updateContainerHeight(containerHeight) {
        this.containerHeight = containerHeight

        this.containerHeightUpdated(this.containerHeight, containerHeight)

        return this.containerHeight
    }

    updateSliderHeight(viewportHeight = this.viewportHeight, containerHeight = this.containerHeight) {
        this.sliderHeight = viewportHeight * viewportHeight / containerHeight

        return this.sliderHeight
    }

    mounted() {
        console.warn(this.aqua.uiMgr.get('components'))
    }

    ready() {

    }

    active() {

    }

    inactive() {

    }

    uninstalled() {

    }
}

module.exports = Scroller
