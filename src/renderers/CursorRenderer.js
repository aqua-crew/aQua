const { rAF } = require('../utils/index')
const { DisposablePool } = require('../pools/index')

class CursorRenderer {
    constructor(aqua) {
        this.applyName = 'cursor'

        this.cursors = aqua.cursorMgr
        this.marker = aqua.marker
        this.pool = new DisposablePool(aqua.uiMgr.get('cursorCntr'), 'cursor')
    }

    render(viewport) {
        this.pool.resetUnuse()

        const renderArea = viewport.getRenderArea()

        if (this.cursors.offsetMap.size > 0) {
            this.cursors.flushOffset()
        }

        this.cursors.pureTraverse(cursor => {
            if (this.cursors.isPrimary(cursor)) {
                this.renderCursor(cursor)

                return
            }

            if (cursor.y < renderArea.start || cursor.y >= renderArea.end) {
                return
            }

            this.renderCursor(cursor, cursor.status)
        })

        this.pool.clearUnuse()
    }

    renderCursor(cursor, status = {}) {
        const $cursor = this.pool.get()
        const layout = cursor.updateLayout()

        let cssText = ''

        if (this.marker.isMarked(status, 'OverlayMark')) {
            cssText = this.marker.use(status, 'OverlayMark')
        }

        this.updateCursor($cursor, layout, cssText)
    }

    updateCursor($cursor, layout, cssText = '') {
        rAF(() => {
            $cursor.style.cssText = cssText + `transform: translate(${layout.x}px, ${layout.y}px);`
        })
    }
}

module.exports = CursorRenderer
