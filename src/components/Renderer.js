const { LineHelper } = require('../helpers/index')
const { DOM, rAF } = require('../utils/index')

const Renderers = require('../renderers/index')
// const { CursorRenderer, LineNumRenderer, LineRenderer, SelectionRenderer } = require('../renderers/index')

class Renderer {
    constructor(aqua) {
        this.aqua = aqua

        this.renderers = null

        this.doc = aqua.docMgr
        this.korwa = aqua.korwa
    }

    initRenders(Renders) {
        this.renderers = Object.create(null)

        Object.keys(Renderers).forEach(name => {
            const render = new Renderers[name](this.aqua)
            this.renderers[render.applyName] = render
        })
    }

    initEvents() {
        const viewport = this.aqua.viewport
        const docWatcher = this.aqua.docWatcher
        const khala = this.aqua.khala

        let lastChange = 0

        // this.linePool.init(40)

        let timeoutId = null
        docWatcher.off('change')
        docWatcher.on('change', data => {
            // console.warn('Changed', data)
            const lines = data.effectLines

            LineHelper.setHeight(lines, this.korwa.measureLinesHeight(lines))
            docWatcher.emit('resize', lines)

            clearTimeout(timeoutId)
            if (new Date().getTime() - lastChange > 17) {
                this.renderViewport(viewport, true)
            } else {
                timeoutId = setTimeout(() => {
                    this.renderViewport(viewport, true)
                }, 17)
            }

            lastChange = new Date().getTime()
            // this.aqua.uiMgr.get('beacon').style.height = count + 'px'
        })

        khala.off('scroll')
        khala.on('scroll', (y, lastY, force) => {
            viewport.update(y)

            this.renderViewport(viewport, force)
        })
    }

    init() {
        this.initRenders(Renderers)
        this.initEvents()
    }

    renderViewport(viewport = this.aqua.viewport, force = false) {
        const start = this.doc.getLineByHeight(viewport.ceiling).staticLineNum
        const end = this.doc.getLineByHeight(viewport.floor, true).staticLineNum + 1

        const visibleArea = viewport.updateVisibleArea(start, end)

        if (!force && !viewport.isVisionLost()) {
            return
        }

        const renderStart = this.doc.correctLineNumAsIndex(visibleArea.start - viewport.lps)
        const renderEnd = this.doc.correctLineNumAsIndex(visibleArea.end + viewport.lps)
        const oldRenderArea = viewport.getRenderArea()
        const renderArea = viewport.updateRenderArea(renderStart, renderEnd)

        viewport.pad(this.doc.getLineWithHeight(renderArea.start).top)

        this.render('line', viewport, renderArea, oldRenderArea)
        this.render('cursor', viewport)
        this.render('inputer', viewport)
        this.render('selection', viewport)
        this.render('selectedLine', viewport)
        this.render('lineNum', viewport)
    }

    render(applyName, ...payload) {
        this.renderers[applyName].render(...payload)
    }
}

module.exports = Renderer
