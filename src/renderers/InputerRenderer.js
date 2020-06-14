const { rAF } = require('../utils/index')

class InputerRenderer {
    constructor(aqua) {
        this.applyName = 'inputer'

        this.scroller = aqua.scroller
        this.cursors = aqua.cursorMgr
        this.korwa = aqua.korwa
        this.$inputerLocator = aqua.uiMgr.get('inputerLocator')
    }

    render(viewport) {
        this.cursors.getPrimary(cursor => {
            if (!cursor) { // 初始化的时候 docMgr.write(''), 会渲染视图, 但此时 cursors.main 并没有生成
                return
            }

            if (cursor.$y < viewport.ceiling || (cursor.$y + this.korwa.getSingleLineHeight()) > viewport.floor) {
                return
            }

            rAF(() => {
                this.$inputerLocator.style.top = cursor.$y - this.scroller.y + 'px'
                this.$inputerLocator.style.left = cursor.$x + this.korwa.ramWidth + 'px'
            })
        })
    }
}

module.exports = InputerRenderer
