const { rAF } = require('../utils/index')

class InputerRenderer {
    constructor(aqua) {
        this.applyName = 'inputer'

        this.cursors = aqua.cursorMgr
        this.$inputerLocator = aqua.uiMgr.get('inputerLocator')
    }

    /**
     * TODO: 这个 inputer 无法随着 cursor 的位置更新而更新
     */
    render(viewport) {
        const cursor = this.cursors.main

        rAF(() => {
            setTimeout(() => {
                this.$inputerLocator.style.cssText = `display: block; top: ${cursor.$y}px; left: ${cursor.$x}px;`
            }, 100)
        })
    }
}

module.exports = InputerRenderer
