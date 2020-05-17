const { Viewport } = require('../models/index')

class ViewportMgr {
    constructor(aqua) {
        this.aqua = aqua

        this.main = null
        this.viewports = []
    }

    init(options) {
        this.create(options)
        this.main = this.viewports[0]
        this.aqua.viewport = this.main
    }

    create(options) {
        const viewport = new Viewport(options)
        this.viewports.push(viewport)

        return viewport
    }

    remove(vid, count = 1) {
        if (vid > 0) {
            this.viewports.splice(vid, count)
        }
    }

    get(vid) {
        return this.viewports[vid]
    }

    traverse(cb, viewports = this.viewports) {
        for (let i = 0; i < viewports.length; i++) {
            cb(viewports[i])
        }
    }
}

module.exports = ViewportMgr
