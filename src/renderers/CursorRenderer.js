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
            if (cursor.y < renderArea.start || cursor.y >= renderArea.end) {
                return
            }

            this.renderCursor(cursor)
        })

        this.pool.clearUnuse()
    }

    renderCursor(cursor) {
        const $cursor = this.pool.get()
        const layout = cursor.updateLayout()

        this.updateCursor($cursor, layout)
    }

    updateCursor($cursor, layout) {
        rAF(() => {
            $cursor.style.cssText = `transform: translate(${layout.x}px, ${layout.y}px)`
        })
    }
}

module.exports = CursorRenderer
