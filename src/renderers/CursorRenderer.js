const { rAF } = require('../utils/index')
const { DisposablePool } = require('../pools/index')

const BlinkAnimationConfig = {
    OpacityMin: '.05',
    OpacityMax: '1',
    BlinkInterval: 600,
}

class CursorRenderer {
    constructor(aqua) {
        this.applyName = 'cursor'

        this.cursors = aqua.cursorMgr
        this.marker = aqua.marker

        this.$cursorCntr = aqua.uiMgr.get('cursorCntr')
        this.pool = new DisposablePool(this.$cursorCntr, 'cursor')

        this.pesudoOpacity = 1
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

        this.blink(true)
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

    blink(focus = false) {
        clearTimeout(this.timeout)

        if (focus) {
            rAF(() => {
                this.$cursorCntr.style.opacity = this.pesudoOpacity = BlinkAnimationConfig.OpacityMax
            })
        }

        this.timeout = setTimeout(() => {
            rAF(() => {
                this.$cursorCntr.style.opacity = this.pesudoOpacity = this.pesudoOpacity === BlinkAnimationConfig.OpacityMax ? BlinkAnimationConfig.OpacityMin : BlinkAnimationConfig.OpacityMax
            })

            this.blink()
        }, BlinkAnimationConfig.BlinkInterval)
    }
}

module.exports = CursorRenderer
