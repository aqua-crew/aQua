const { rAF } = require('../utils/index')

/* Temp */
const SLIDER_MIN_HEIGHT = 40

class ScrollBarRenderer {
    constructor(aqua) {
        this.applyName = 'scrollBar'

        this.cursorMgr = aqua.cursorMgr
        this.scroller = aqua.scroller
        this.$slider = aqua.uiMgr.get('scrollBar').firstChild
    }

    render(viewport) {
        this.updateScrollerBar(this.$slider, viewport)
    }

    updateScrollerBar($slider, viewport) {
        const height = this.transformToScrollBarHeight(viewport, viewport.height, SLIDER_MIN_HEIGHT)
        const y = this.transformToScrollBarY(viewport, this.scroller.y, height)

        rAF(() => {
            this.$slider.style.height = height + 'px'
            this.$slider.style.transform = `translateY(${y}px)`
        })

        this.cursorMgr.pureTraverse(cursor => {

        })
    }

    transformToScrollBarHeight(viewport, heightInViewport, minHeight = 0) {
        return Math.max(heightInViewport / (this.scroller.max + viewport.height) * viewport.height, minHeight)
    }

    transformToScrollBarY(viewport, yInViewport, heightInViewport = 0) {
        return yInViewport / this.scroller.max * (viewport.height - heightInViewport)
    }
}

module.exports = ScrollBarRenderer
