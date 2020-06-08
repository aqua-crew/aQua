const { rAF } = require('../utils/index')

class InputerRenderer {
    constructor(aqua) {
        this.applyName = 'inputer'

        this.scroller = aqua.scroller
        this.cursors = aqua.cursorMgr
        this.korwa = aqua.korwa
        this.$inputerLocator = aqua.uiMgr.get('inputerLocator')

        this.coord = {
            y: -1,
            x: -1,
        }
    }

    render(viewport) {
        const cursor = this.cursors.main

        if (!cursor) { // 初始化的时候 docMgr.write(''), 会渲染视图, 但此时 cursors.main 并没有生成
            return
        }

        if (cursor.coord.equal(this.coord)) {
            return
        }

        this.coord = cursor.coord.extract()

        const $y = cursor.$y

        if ($y < viewport.ceiling || ($y + this.korwa.getSingleLineHeight()) > viewport.floor) {
            this.scroller.scrollTo(cursor.$y - (viewport.floor - viewport.ceiling) / 2)

            return
        }

        rAF(() => {
            this.$inputerLocator.style.top = cursor.$y - this.scroller.y + 'px'
            this.$inputerLocator.style.left = cursor.$x + 'px'
        })
    }
}

module.exports = InputerRenderer
