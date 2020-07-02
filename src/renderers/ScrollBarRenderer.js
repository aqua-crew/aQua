const { rAF } = require('../utils/index')

/* Temp */
const SLIDER_MIN_HEIGHT = 40

class ScrollBarRenderer {
    constructor(aqua) {
        this.applyName = 'scrollBar'
        this.scroller = aqua.scroller
        this.$slider = aqua.uiMgr.get('scrollBar').firstChild
    }

    render(viewport) {
        this.updateScrollerBar(this.$slider, this.scroller.y, viewport.height, this.scroller.max)
    }

    updateScrollerBar($slider, scrollDistance, viewportHeight, max) {
        const height = Math.max(viewportHeight / (max + viewportHeight) * viewportHeight, SLIDER_MIN_HEIGHT)
        const y = scrollDistance / max * (viewportHeight - height)

        rAF(() => {
            this.$slider.style.height = height + 'px'
            this.$slider.style.transform = `translateY(${y}px)`
        })
    }
}

module.exports = ScrollBarRenderer
