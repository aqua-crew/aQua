const { rAF } = require('../utils/index')

/* Temp */
const SLIDER_MIN_HEIGHT = 40

class ScrollBarRenderer {
    constructor(aqua) {
        this.applyName = 'scrollBar'

        this.cursorMgr = aqua.cursorMgr
        this.scroller = aqua.scroller

        this.$scrollBar = aqua.uiMgr.get('scrollBar')
        this.$slider = this.$scrollBar.firstChild
    }

    render(viewport) {
        this.update(this.$slider, viewport)
    }

    update($slider, viewport) {
        const height = this.scroller.transformHeight(viewport, viewport.height, SLIDER_MIN_HEIGHT)
        const y = this.scroller.transformY(viewport, this.scroller.y, height)

        rAF(() => {
            this.$slider.style.height = height + 'px'
            this.$slider.style.transform = `translateY(${y}px)`
        })
    }
}

module.exports = ScrollBarRenderer
