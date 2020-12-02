const { SizeObserver } = require('../utils/index')

class ViewportObserver {
    constructor(aqua, extend) {
        this.aqua = aqua

        this.resizeObserver = null

        this.observe()
    }

    observe() {
        this.resizeObserver = new SizeObserver

        this.resizeObserver.observe(this.aqua.uiMgr.get('viewport'), entry => {
            const contentRect = entry.contentRect
            const viewport = this.aqua.viewport

            viewport.height = contentRect.height
            viewport.width = contentRect.width

            this.aqua.docWatcher.emit('change', {
                effectLines: this.aqua.docMgr.getLines(0, this.aqua.docMgr.size),
            })
        })
    }

    unobserve() {
        this.resizeObserver && this.resizeObserver.disconnect()
    }
}

module.exports = ViewportObserver
