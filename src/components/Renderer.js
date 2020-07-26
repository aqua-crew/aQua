const { LineHelper } = require('../helpers/index')
const { DOM, rAF, Limiter, SimpleSet } = require('../utils/index')
const { ArgOpt, CSSVariables } = require('../enums/index')

const Renderers = require('../renderers/index')

class Renderer {
    constructor(aqua) {
        this.aqua = aqua

        this.renderers = null
        this.groups = null

        this.doc = aqua.docMgr
        this.korwa = aqua.korwa

        this.renderSet = new SimpleSet

        this.renderViewport = Limiter.toNextTick(this.renderViewport.bind(this), 17)
        this.startup = Limiter.toNextTick(this.startup.bind(this), 17)
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

        // let lastChange = 0
        // let timeoutId = null

        docWatcher.on('change', data => {
            const lines = data.effectLines

            LineHelper.setHeight(lines, this.korwa.measureLinesHeight(lines))
            docWatcher.emit('resize', lines)

            this.renderViewport(viewport, ArgOpt.SkipVisionCheck)
        })

        khala.on('scroll', (y, force) => {
            viewport.update(y)

            this.renderViewport(viewport, force)
        })

        const $components = uiMgr.get('components')
        const $lineWidthCntr = uiMgr.get('lineWidthCntr')

        khala.on('ramWidthResize', ({ ramWidth, lineNumWidth } = {}) => {
            rAF(() => {
                $components.style.setProperty(CSSVariables.LineWidth, lineNumWidth + 'px')
                $components.style.setProperty(CSSVariables.RamWidth, ramWidth + 'px')

                const lines = this.doc.getLines(0, this.doc.size)

                LineHelper.setHeight(lines, this.korwa.measureLinesHeight(lines))
                docWatcher.emit('resize', lines)

                this.renderViewport(viewport, ArgOpt.SkipVisionCheck)
            })
        })
    }

    initGroups() {
        this.groups = Object.create(null)

        this.setGroup('standard', viewport => {
            this.render('cursor', viewport)
            this.render('inputer', viewport)
            this.render('selection', viewport)
            this.render('selectedLine', viewport)
            this.render('lineNum', viewport)
        })

        this.setGroup('scroller', viewport => {
            this.render('scroller', viewport)
            this.render('scrollBar', viewport)
        })
    }

    init() {
        this.initRenders(Renderers)
        this.initEvents()
        this.initGroups()
    }

    renderViewport(viewport = this.aqua.viewport, force = false) {
        this.renderGroup('scroller', viewport)

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

        this.render('pad', viewport)
        this.render('line', viewport, renderArea, oldRenderArea)
        this.renderGroup('standard', viewport)
        this.render('minimap', viewport)
    }

    setRenderer(Renderer) {
        const renderer = new Renderer(this.aqua)
        this.renderers[renderer.applyName] = renderer
    }

    getRenderer(applyName) {
        return this.renderers[applyName]
    }

    render(applyName, ...payload) {
        this.renderSet.add(applyName, payload)

        this.startup()
    }

    renderImmediately(applyName, ...payload) {
        this.getRenderer(applyName).render(...payload)
    }

    renderGroup(groupName, ...payload) {
        this.getGroup(groupName)(...payload)
    }

    setGroup(name, cb) {
        this.groups[name] = cb
    }

    getGroup(name) {
        return this.groups[name]
    }

    startup() {
        const [ renderers, traverse ] = this.renderSet.use()

        traverse(renderers, renderer => {
            this.renderImmediately(renderer.name, ...renderer.payload)
        })
    }
}

module.exports = Renderer
