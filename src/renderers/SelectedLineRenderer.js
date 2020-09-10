const { rAF } = require('../utils/index')
const { DisposablePool } = require('../pools/index')

class SelectedLineRenderer {
    constructor(aqua) {
        this.applyName = 'selectedLine'

        this.doc = aqua.docMgr
        this.cursors = aqua.cursorMgr
        this.pool = new DisposablePool(aqua.uiMgr.get('selectedLineCntr'), 'selectedLine')
    }

    render(viewport) {
        this.pool.resetUnuse()

        const renderArea = viewport.getRenderArea()

        this.cursors.pureTraverse(cursor => {
            const y = cursor.y

            if (y < renderArea.start || y >= renderArea.end) {
                return
            }

            const { top, height } = this.doc.getLineWithHeight(y)
            this.updateSelectedLine(top, height)
        })

        this.pool.clearUnuse()
    }

    updateSelectedLine(top, height) {
        const $selectedLine = this.pool.get(top)

        if (!$selectedLine) {
            return
        }

        rAF(() => {
            $selectedLine.style.cssText = `opacity: 1; top: ${top}px; height: ${height}px;`
        })
    }
}

module.exports = SelectedLineRenderer
