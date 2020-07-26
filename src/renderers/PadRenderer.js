const { rAF } = require('../utils/index')

class PadRenderer {
    constructor(aqua) {
        this.applyName = 'pad'

        this.docMgr = aqua.docMgr
        this.$pad = aqua.uiMgr.get('lineCntr')
    }

    render(viewport, force = true) {
        const pad = this.docMgr.getLineWithHeight(viewport.getRenderArea().start).top

        rAF(() => {
            this.$pad.style.transform = `translateY(${pad}px)`
        })
    }
}

module.exports = PadRenderer
