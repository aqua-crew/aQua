const { rAF } = require('../utils/index')
const { DisposablePool } = require('../pools/index')

class CursorRenderer {
    constructor(aqua) {
        this.applyName = 'cursor'

        this.cursors = aqua.cursorMgr
        this.cursorPool = new DisposablePool(aqua.uiMgr.get('cursorCntr'), 'cursor')
    }

    render(viewport) {
        console.error('Emit Cursor Render')
        this.cursorPool.resetUnuse()

        const renderArea = viewport.getRenderArea()

        this.cursors.pureTraverse(cursor => {
            if (cursor.y < renderArea.start || cursor.y >= renderArea.end) {
                return
            }

            this.renderCursor(cursor)
        })

        this.cursorPool.clearUnuse()
    }

    renderCursor(cursor) {
        const $cursor = this.cursorPool.get()

        this.updateCursor($cursor, cursor.updateLayout())
    }

    updateCursor($cursor, layout) {
        rAF(() => {
            $cursor.style.cssText = `transform: translate(${layout.x}px, ${layout.y}px)`
        })
    }
}

module.exports = CursorRenderer
