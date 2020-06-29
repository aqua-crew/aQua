const { rAF } = require('../utils/index')
const { DisposablePool } = require('../pools/index')

class CursorRenderer {
    constructor(aqua) {
        this.applyName = 'cursor'

        this.cursors = aqua.cursorMgr
        this.pool = new DisposablePool(aqua.uiMgr.get('cursorCntr'), 'cursor')
    }

    render(viewport) {
        this.pool.resetUnuse()

        const renderArea = viewport.getRenderArea()

        this.cursors.pureTraverse(cursor => {
            if (this.cursors.isPrimary(cursor)) {
                this.renderCursor(cursor)

                return
            }

            if (cursor.y < renderArea.start || cursor.y >= renderArea.end) {
                return
            }

            console.error(cursor.state)
            this.renderCursor(cursor, cursor.state)
        })

        this.pool.clearUnuse()
    }

    renderCursor(cursor, state = {}) {
        const $cursor = this.pool.get()
        const layout = cursor.updateLayout()

        let cssText = ''

        if (state.overlayMark) {
            cssText = 'background-color: rgba(255, 133, 173, .5);'

            setTimeout(() => {
                state.overlayMark = false
            })
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
