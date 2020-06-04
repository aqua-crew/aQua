const { rAF } = require('../utils/index')
const { DisposablePool } = require('../pools/index')

class SelectedLineRenderer {
    constructor(aqua) {
        this.applyName = 'selectedLine'

        this.doc = aqua.docMgr
        this.cursors = aqua.cursorMgr
        this.pool = new DisposablePool(aqua.uiMgr.get('selectedLineCntr'), 'selectedLine')

        this.selected = Object.create(null)
    }

    render(viewport) {
        console.error('Emit SelectedLine Render')

        this.pool.resetUnuse()
        this.selected = Object.create(null)

        const renderArea = viewport.getRenderArea()

        this.cursors.pureTraverse(cursor => {
            const y = cursor.y

            if (y < renderArea.start || y >= renderArea.end) {
                return
            }

            if (this.selected[y]) {
                return
            }

            this.selected[y] = true

            const { top, height } = this.doc.getLineWithHeight(y)
            this.updateSelectedLine(this.pool.get(), top, height)
        })

        this.pool.clearUnuse()
    }

    updateSelectedLine($selectedLine, top, height) {
        rAF(() => {
            $selectedLine.style.cssText = `opacity: 1; top: ${top}px; height: ${height}px;`
        })
    }
}

module.exports = SelectedLineRenderer
