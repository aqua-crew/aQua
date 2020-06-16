const { LineHelper } = require('../helpers/index')
const { DOM, rAF } = require('../utils/index')
const { ArgOpt, CSSVariables } = require('../enums/index')

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
            this.setRenderer(Renderers[name])
        })
    }

    initEvents() {
        const viewport = this.aqua.viewport
        const docWatcher = this.aqua.docWatcher
        const khala = this.aqua.khala
        const uiMgr = this.aqua.uiMgr

        let lastChange = 0

        let timeoutId = null

        docWatcher.on('change', data => {
            const lines = data.effectLines

            LineHelper.setHeight(lines, this.korwa.measureLinesHeight(lines))
            docWatcher.emit('resize', lines)

            clearTimeout(timeoutId)
            if (new Date().getTime() - lastChange > 17) {
                this.renderViewport(viewport, ArgOpt.SkipVisionCheck)
            } else {
                timeoutId = setTimeout(() => {
                    this.renderViewport(viewport, ArgOpt.SkipVisionCheck)
                }, 17)
            }

            lastChange = new Date().getTime()
        })

        khala.on('scroll', (y, lastY, force) => {
            viewport.update(y)

            this.renderViewport(viewport, force)
        })

        const $components = uiMgr.get('components')
        const $lineWidthCntr = uiMgr.get('lineWidthCntr')

        khala.on('ramWidthResize', ({ ramWidth, lineNumWidth } = {}) => {
            console.error('触发了 ramWidthResize')
            rAF(() => {
                $components.style.setProperty(CSSVariables.LINE_WIDTH, lineNumWidth + 'px')
                $components.style.setProperty(CSSVariables.RAM_WIDTH, ramWidth + 'px')

                const lines = this.doc.getLines(0, this.doc.size)

                console.error('执行了 ramWidthResize')

                LineHelper.setHeight(lines, this.korwa.measureLinesHeight(lines))
                docWatcher.emit('resize', lines)

                this.renderViewport(viewport, ArgOpt.SkipVisionCheck)
            })
        })
    }

    init() {
        this.initRenders(Renderers)
        this.initEvents()
    }

    renderViewport(viewport = this.aqua.viewport, force = false) {
        console.group('')
        console.info('viewport.ceiling', viewport.ceiling, this.doc.getLineByHeight(viewport.ceiling).data)
        const start = this.doc.getLineByHeight(viewport.ceiling).staticLineNum
        console.error('viewport.floor', viewport.floor)
        const end = this.doc.getLineByHeight(viewport.floor, true).staticLineNum + 1
        console.groupEnd('')

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
        this.getRenderer(applyName).render(...payload)
    }

    getRenderer(applyName) {
        return this.renderers[applyName]
    }

    setRenderer(Renderer) {
        const renderer = new Renderer(this.aqua)
        this.renderers[renderer.applyName] = renderer
    }
}

module.exports = Renderer
