const { rAF, DOM } = require('../utils/index')
const { DisposablePool } = require('../pools/index')

const ArgOpt = {
    ScrollBarCursorHeight: 5,
}

class ScrollBarCursor {
    constructor(aqua) {
        this.applyName = 'scrollBarCursor'

        this.docMgr = aqua.docMgr
        this.cursorMgr = aqua.cursorMgr
        this.scroller = aqua.scroller

        this.pool = new DisposablePool(aqua.uiMgr.get('scrollBar'), 'cursorMark')
    }

    render(viewport) {
        this.pool.resetUnuse()

        this.cursorMgr.pureTraverse(cursor => {
            this.update(viewport, cursor)
        })

        this.pool.clearUnuse()
    }

    update(viewport, cursor) {
        const y = this.scroller.transformY(viewport, cursor.$y, ArgOpt.ScrollBarCursorHeight)
        const $mark = this.pool.get(y)

        if (!$mark) {
            return
        }

        rAF(() => {
            $mark.style.transform = `translateY(${y}px)`
        })
    }
}

module.exports = ScrollBarCursor
