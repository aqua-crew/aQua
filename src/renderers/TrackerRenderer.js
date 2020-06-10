const { rAF } = require('../utils/index')

class TrackerRenderer {
    constructor(aqua) {
        this.applyName = 'tracker'

        this.scroller = aqua.scroller
        this.cursors = aqua.cursorMgr
        this.korwa = aqua.korwa
    }

    render(viewport, force = true) {
        this.cursors.getMain(cursor => {
            if (!cursor) { // 初始化的时候 docMgr.write(''), 会渲染视图, 但此时 cursors.main 并没有生成
                return
            }

            // const layout = cursor.updateLayout()

            const $y = cursor.$y

            if ($y < viewport.ceiling || ($y + this.korwa.getSingleLineHeight()) > viewport.floor) {
                this.scroller.scrollTo($y - (viewport.floor - viewport.ceiling) / 2, true)

                return
            }
        })
    }
}

module.exports = TrackerRenderer
