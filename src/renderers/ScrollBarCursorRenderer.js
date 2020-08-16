const { rAF, DOM } = require('../utils/index')

class ScrollBarCursor {
    constructor(aqua) {
        this.applyName = 'scrollBarCursor'

        this.docMgr = aqua.docMgr
        this.cursorMgr = aqua.cursorMgr
        this.scroller = aqua.scroller
        this.$scrollBar = aqua.uiMgr.get('scrollBar')

        this.$mark = DOM.e('div', {'class': 'aqua-cursor-mark'})
        this.$scrollBar.appendChild(this.$mark)
    }

    render(viewport) {
        this.update(this.$scrollBar, viewport)
    }

    update($scrollBar, viewport) {
        rAF(() => {
            this.cursorMgr.pureTraverse(cursor => {
                const y = this.scroller.transformY(viewport, cursor.$y, 5)

                this.$mark.style.transform = `translateY(${y}px)`
            })
        })
    }
}

module.exports = ScrollBarCursor
