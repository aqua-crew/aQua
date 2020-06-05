const { DOM, rAF } = require('../utils/index')
const { DisposablePool } = require('../pools/index')

class SelectionRenderer {
    constructor(aqua) {
        this.applyName = 'selection'

        this.korwa = aqua.korwa
        this.locator = aqua.locator
        this.cursors = aqua.cursorMgr
        this.pool = new DisposablePool(aqua.uiMgr.get('selectionCntr'), 'selection')
    }

    render(viewport) {
        const renderArea = viewport.getRenderArea()

        this.pool.resetUnuse()

        this.cursors.pureTraverse(cursor => {
            if (cursor.selection.isCollapsed()) {
                return
            }

            const start = cursor.selection.getStart()

            if (start.y < renderArea.start || start.y >= renderArea.end) {
                return
            }

            const end = cursor.selection.getEnd()

            if (end.y < renderArea.start || end.y >= renderArea.end) {
                return
            }

            this.renderSelection(cursor.selection)
        })

        this.pool.clearUnuse()
    }

    renderSelection(selection) {
        let count = selection.containMinLines()
        let $selections = []

        for (let i = count; i > 0; i--) {
            $selections.push(this.pool.get())
        }

        this._renderSelection($selections, selection.getStart(), selection.getEnd(), count)
    }

    _renderSelection($selections, start, end) {
        const count = $selections.length
        const lineHeight = this.korwa.getSingleLineHeight()

        if (count === 1) {
            const startLayout = this.locator.getLayoutByCoord(start.y, start.x)
            const endLayout = this.locator.getLayoutByCoord(end.y, end.x)

            rAF(() => {
                $selections[0].style.cssText = `top: ${startLayout.y}px; left: ${startLayout.x}px; width: ${endLayout.x - startLayout.x}px; height: ${lineHeight}px`
            })

            return
        }

        if (count === 2) {
            const startLayout = this.locator.getLayoutByCoord(start.y, start.x)
            const endLayout = this.locator.getLayoutByCoord(end.y, end.x)

            rAF(() => {
                $selections[0].style.cssText = `top: ${startLayout.y}px; left: ${startLayout.x}px; right: 0; height: ${lineHeight}px`
                $selections[1].style.cssText = `top: ${endLayout.y}px; left: 0; width: ${endLayout.x}px; height: ${lineHeight}px`
            })

            return
        }

        if (count === 3) {
            const startLayout = this.locator.getLayoutByCoord(start.y, start.x)
            const endLayout = this.locator.getLayoutByCoord(end.y, end.x)

            rAF(() => {
                $selections[0].style.cssText = `top: ${startLayout.y}px; left: ${startLayout.x}px; right: 0; height: ${lineHeight}px`
                $selections[1].style.cssText = `top: ${endLayout.y}px; left: 0; width: ${endLayout.x}px; height: ${lineHeight}px`
                $selections[2].style.cssText = `top: ${startLayout.y + lineHeight}px; left: 0; right: 0; bottom: 20px; height: ${endLayout.y - startLayout.y - lineHeight}px`
            })
        }

        return
    }

}

module.exports = SelectionRenderer
