const { rAF } = require('../utils/index')

class ScrollerRenderer {
    constructor(aqua) {
        this.applyName = 'scroller'

        this.scroller = aqua.scroller
        this.$scroller = aqua.uiMgr.get('scroller')
    }

    render(viewport) {
        this.updateScroller(this.$scroller, this.scroller.y)
    }

    updateScroller($scroller, y) {
        rAF(() => {
            this.$scroller.style.transform = `translateY(-${y}px)`
        })
    }
}

module.exports = ScrollerRenderer
