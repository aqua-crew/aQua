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
            const end = cursor.selection.getEnd()

            if (start.y >= renderArea.end || end.y < renderArea.start) {
                return
            }

            this.renderSelection(cursor.selection, cursor.state)
        })

        this.pool.clearUnuse()
    }

    renderSelection(selection, state = {}) {
        let count = selection.containMinLines()
        let $selections = []

        for (let i = count; i > 0; i--) {
            $selections.push(this.pool.get())
        }

        let cssText = ''

        if (state.overlayMark) {
            cssText = 'background-color: rgba(255, 133, 173, .5);'

            setTimeout(() => {
                // delete state.overlayMark
                // https://stackoverflow.com/questions/43594092/slow-delete-of-object-properties-in-js-in-v8/44008788
                state.overlayMark = false
            })
        }

        this.updateSelection($selections, selection.getStart(), selection.getEnd(), cssText)
    }

    updateSelection($selections, start, end, cssText = '') {
        const count = $selections.length
        const lineHeight = this.korwa.getSingleLineHeight()

        const startLayout = this.locator.getLayoutByCoord(start.y, start.x, start.insideY)
        const endLayout = this.locator.getLayoutByCoord(end.y, end.x, end.insideY)

        if (count === 1) {
            rAF(() => {
                $selections[0].style.cssText = cssText + `top: ${startLayout.y}px; left: ${startLayout.x}px; width: ${endLayout.x - startLayout.x}px; height: ${lineHeight}px;`
            })

            return
        }

        if (count === 2) {
            rAF(() => {
                $selections[0].style.cssText = cssText + `top: ${startLayout.y}px; left: ${startLayout.x}px; right: 0; height: ${lineHeight}px`
                $selections[1].style.cssText = cssText + `top: ${endLayout.y}px; left: 0; width: ${endLayout.x}px; height: ${lineHeight}px`
            })

            return
        }

        if (count === 3) {
            rAF(() => {
                $selections[0].style.cssText =  cssText + `top: ${startLayout.y}px; left: ${startLayout.x}px; right: 0; height: ${lineHeight}px`
                $selections[1].style.cssText =  cssText + `top: ${endLayout.y}px; left: 0; width: ${endLayout.x}px; height: ${lineHeight}px`
                $selections[2].style.cssText =  cssText + `top: ${startLayout.y + lineHeight}px; left: 0; right: 0; bottom: 20px; height: ${endLayout.y - startLayout.y - lineHeight}px`
            })
        }

        return
    }

}

module.exports = SelectionRenderer
