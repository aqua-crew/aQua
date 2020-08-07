const { DataTransferItemHandler, Iterator, Khala, Kizuna, Marker, Noop, Progress } = require('./utils/index')
const { DefaultOptions } = require('./options/index')
const { ActionMgr, Chronicle, ContentMgr, CursorMgr, DocMgr, History, Inputer, Korwa, LineMgr, Locator, OptionMgr, PluginMgr, ProcessorMgr, Renderer, Scroller, State, UIMgr, ViewportMgr } = require('./components/index')
const { Coord, Content } = require('./models/index')
const Lines = require('./lines/index')
const Cursors = require('./cursors/index')
const Actions = require('./actions/index')
const UI = require('./ui/index')
const Processors = require('./processors/index')
const Marks = require('./marks/index')
const plugins = require('./plugins/index')

const { StringAsset, ImageAsset } = require('./assets/index')
// const aqua = require('./aquaqua.jpg')

class Aqua {
    constructor(options) {
        this.optionMgr = new OptionMgr(this)

        this.progress = new Progress
        this.khala = new Khala
        this.lifetimes = new Khala
        this.docWatcher = new Khala
        this.kizuna = new Kizuna
        this.state = new State
        this.marker = new Marker

        this.loadOptions(options)

        this.uiMgr = new UIMgr(this)
        this.loadUI(UI)
        this.mountUI()
        this.loadPlugins([...plugins, ...this.optionMgr.get('plugins')])

        this.optionMgr.normalize()
        this.lifetimes.emit('setup', this)
        this.progress.set(0)

        this.chronicle = new Chronicle(this)
        this.pluginMgr = new PluginMgr(this)
        this.scroller = new Scroller(this)
        this.processorMgr = new ProcessorMgr(this)
        this.korwa = new Korwa(this)
        this.lineMgr = new LineMgr(this)
        this.cursorMgr = new CursorMgr(this)
        this.actionMgr = new ActionMgr(this)
        this.contentMgr = new ContentMgr(this)
        this.docMgr = new DocMgr(this)
        this.locator = new Locator(this)
        this.viewportMgr = new ViewportMgr(this)
        this.renderer = new Renderer(this)
        this.inputer = new Inputer(this)

        this.progress.set(20)

        this.loadMarks(Marks)
        this.loadProcessors(Processors)
        this.loadLines(Lines)
        this.loadCursors(Cursors)
        this.loadActions(Actions)
        this.loadViewportEvents()
        this.loadInputerEvents()
        this.loadDocumentEvents()

        this.lifetimes.emit('ready', this)
        this.progress.set(60)

        this.init()
        this.expose()

        this.lifetimes.emit('complete', this)
        this.progress.set(100)

        this.releaseExtendPlugins()
        this.progress = null

        /* Dev test */
        window.aqua = this
    }

    static use(ExtendPlugin, ...options) {
        if (!this.extendPlugins) {
            this.extendPlugins = []
        }

        if (this.extendPlugins.indexOf(ExtendPlugin) > -1) {
            return
        }

        this.extendPlugins.push(ExtendPlugin)

        ExtendPlugin.install ? ExtendPlugin.install(Aqua, ...options) : new ExtendPlugin(Aqua, ...options)
    }

    releaseExtendPlugins() {
        Aqua.extendPlugins = null
    }

    expose() {
        this.write = (...payload) => {
            this.chronicle.start('Input', this.cursorMgr.extract())
            this.docMgr.write(...payload)
            this.chronicle.end('Input', this.cursorMgr.extract())
        }
        this.read = this.docMgr.read.bind(this.docMgr)
        this.delete = this.docMgr.delete.bind(this.docMgr)
        this.do = this.cursorMgr.traverse.bind(this.cursorMgr)
    }

    init() {
        this.lineMgr.init()
        this.korwa.init()
        this.docMgr.init()

        this.viewportMgr.init({
            y: 0,
            height: this.korwa.getViewportRect().height,
            lps: 10,
        })

        this.scroller.init({
            y: 0,
            speed: 250,
            min: 0,
        })

        this.renderer.init()
        this.cursorMgr.init()
        this.chronicle.init()
        this.inputer.init()
    }

    loadProcessors(Processors) {
        Iterator.iterate(Processors, Processor => {
            this.processorMgr.load(Processor)
        })
    }

    loadOptions(options) {
        this.optionMgr.load(options)
    }

    loadMarks(Marks) {
        Iterator.iterate(Marks, (mark, name) => {
            this.marker.load(name, mark)
        })
    }

    loadPlugins(plugins) {
        plugins.forEach(plugin => {
            plugin.install(this)
        })
    }

    loadUI(UI) {
        Iterator.iterate(UI, (fn, name) => {
            this.uiMgr.load(name, fn)
        })
    }

    mountUI() {
        const structure = `
            aqua
                bgCntr
                editor
                    viewport
                        inputerCntr
                            inputerLocator
                                inputer
                        scroller
                            components
                                fullWidthCntr
                                    selectedLineCntr
                                lineWidthCntr
                                    measurerCntr
                                        ramMeasurer
                                        lineMeasurer
                                        remMeasurer
                                    cursorCntr
                                    selectionCntr
                                    lineCntr
                        fixed
                            sideBarCntr
                                minimap
                                scrollBar
                fgCntr
        `

        const $aqua = this.uiMgr.mountByString(structure, {
            mounted: (ele, name) => {
                this.uiMgr.set(name, ele)
            },
        })

        const $el = this.optionMgr.get('el')

        this.uiMgr.mount($el, $aqua)
    }

    loadLines(Lines) {
        Iterator.iterate(Lines, mod => {
            this.lineMgr.load(mod)
        })
    }

    loadCursors(Cursors) {
        Iterator.iterate(Cursors, mod => {
            this.cursorMgr.load(mod)
        })
    }

    loadActions(Actions) {
        Iterator.iterate(Actions, action => {
            this.actionMgr.load(action)
        })
    }

    loadViewportEvents() {
        const $viewport = this.uiMgr.get('viewport')

        this.kizuna.on($viewport, 'contextmenu', event => {
            event.preventDefault()
        })

        this.kizuna.on($viewport, 'mousedown', event => {
            event.preventDefault()
            this.kizuna.filterMousedown(event)

            if (!this.state.focus) {
                this.uiMgr.get('inputer').focus({ preventScroll: true })
            }
        })

        this.kizuna.on($viewport, 'mousemove', event => {
            event.preventDefault()
            this.kizuna.filterMousemove(event)
        })

        this.kizuna.on($viewport, 'mouseup', event => {
            event.preventDefault()
            this.kizuna.filterMouseup(event)
        })

        this.kizuna.on($viewport, 'scroll', event => {
            this.scroller.handleScroll(event)
        })

        this.kizuna.on($viewport, 'dragover', event => {
            event.preventDefault()
        })

        this.kizuna.on($viewport, 'drop', event => {
            event.preventDefault()

            console.error('Drop event event.dataTransfer', event.dataTransfer)

            DataTransferItemHandler.handle(event.dataTransfer, {
                text: text => {
                    console.info('text', text)
                },

                html: html => {
                    const $test = document.getElementById('con')
                    const regexp = new RegExp(/^(<!--StartFragment -->)([\s\S]*)(<!--EndFragment-->)/, 'gm')
                    console.error(regexp.exec(html)[2])
                    console.info('html', html)
                },

                file: file => {
                    console.info('file', file)
                }
            })
        })
    }

    loadInputerEvents() {
        const $inputer = this.uiMgr.get('inputer')

        $inputer.focus()

        this.kizuna.on($inputer, 'focus', event => {
            this.state.focus = true
        })

        this.kizuna.on($inputer, 'blur', event => {
            this.state.focus = false
        })

        this.kizuna.on($inputer, 'input', event => {
            this.inputer.poll()
        })

        this.kizuna.on($inputer, 'keydown', event => {
            this.kizuna.filterKeydown(event)
        })

        this.kizuna.on($inputer, 'keyup', event => {
            // event.preventDefault()
            this.kizuna.filterKeyup(event)
        })

        this.kizuna.on($inputer, 'copy', event => {
            this.actionMgr.exec('Copy', event)
        })

        this.kizuna.on($inputer, 'cut', event => {
            this.actionMgr.exec('Cut', event)
        })

        this.kizuna.on($inputer, 'paste', event => {
            // this.inputer.poll()

            this.actionMgr.exec('Copy', event)

            // const items = event.clipboardData.items
            // console.error('Paste event.clipboardData', event.clipboardData)

            // if (!(event.clipboardData && items)) {
            //     return
            // }

            // for (let i = 0, len = items.length; i < len; i++) {
            //     DataTransferItemHandler.handle(items[i], {
            //         text: text => {
            //             console.info('text', text)
            //         },

            //         html: html => {
            //             const $test = document.getElementById('con')
            //             const regexp = new RegExp(/^(<!--StartFragment-->)([\s\S]*)(<!--EndFragment-->)/, 'gm')

            //             const c = regexp.exec(html)[2]
            //             console.error(c)
            //             $test.innerHTML = c
            //             console.info('html', html)
            //         },

            //         file: file => {
            //             console.info('file', file)
            //         }
            //     })
            // }

            // event.preventDefault()
        })

        this.khala.on('input', text => {
            this.chronicle.start('Input', this.cursorMgr.extract())

            this.cursorMgr.traverse(cursor => {
                if (!cursor.selection.isCollapsed()) {
                    this.actionMgr.execWithName('Backspace', 'backspace', cursor)
                }

                const { y, x } = this.docMgr.write(text, cursor)

                cursor.y = cursor.y + y
                cursor.x = cursor.x + x
            })

            this.chronicle.end('Input', this.cursorMgr.extract())
        })
    }

    loadDocumentEvents() {
        this.kizuna.on(document, 'mousedown', event => {
            this.state.mousedown = true
        })

        this.kizuna.on(document, 'mouseup', event => {
            this.state.mousedown = false
        })

        this.kizuna.on(document, 'visibilitychange', event => {
            if (document.hidden && this.state.mousedown) {
                this.state.mousedown = false
            }

            document.title = document.hidden ? 'Minato' : 'Aqua'
        })
    }

    /* Extract */
    extract() {
        const doc = this.docMgr.extract()
        const cursors = this.cursors.extract()
    }
}

module.exports = Aqua
