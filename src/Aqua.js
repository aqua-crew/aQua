const { Khala, Kizuna, Noop, Iterator, DataTransferItemHandler } = require('./utils/index')
const { DefaultOptions } = require('./options/index')
const { History, Locator, State, Korwa, LineMgr, ContentMgr, CursorMgr, ActionMgr, OptionMgr, UIMgr, ProcessorMgr, Renderer, SelectedMgr, DocMgr, PluginMgr, Scroller, ViewportMgr } = require('./components/index')
const { Coord, Content } = require('./models/index')
const Lines = require('./lines/index')
const Cursors = require('./cursors/index')
const Actions = require('./actions/index')
const Options = require('./options/index')
const UI = require('./ui/index')
const Processors = require('./processors/index')

const { StringAsset, ImageAsset } = require('./assets/index')

const aqua = require('./aquaqua.jpg')

class Aqua {
    constructor(options) {
        this.khala = new Khala
        this.lifetimes = new Khala
        this.docWatcher = new Khala
        this.kizuna = new Kizuna
        this.state = new State

        /* Temp */
        // console.error(options.lifetimes)
        for (let name in options.lifetimes) {
            this.lifetimes.on(name, options.lifetimes[name])
        }


        this.pluginMgr = new PluginMgr(this)
        this.scroller = new Scroller(this)
        this.processorMgr = new ProcessorMgr(this)
        this.optionMgr = new OptionMgr(this)
        this.uiMgr = new UIMgr(this)
        this.korwa = new Korwa(this)
        this.lineMgr = new LineMgr(this)
        this.cursorMgr = new CursorMgr(this)
        this.actionMgr = new ActionMgr(this)
        this.contentMgr = new ContentMgr(this)
        this.docMgr = new DocMgr(this)
        this.selectedMgr = new SelectedMgr(this)
        this.locator = new Locator(this)
        this.viewportMgr = new ViewportMgr(this)
        this.renderer = new Renderer(this)

        window.doc = this.docMgr.doc
        this.loadOptions(Options)
        this.loadOptions(options)
        this.installPlugins()
        this.lifetimes.emit('setup', this)
        this.loadUI(UI)
        this.mountUI()
        this.lifetimes.emit('mounted', this)

        this.loadProcessors(Processors)
        this.loadLines(Lines)
        this.loadCursors(Cursors)
        this.loadActions(Actions)
        this.loadViewportEvents()
        this.loadInputerEvents()

        window.state = this.state
        window.aqua = this

        this.init()
        this.lifetimes.emit('ready', this)

        this.expose()
    }

    expose() {
        this.write = this.docMgr.write.bind(this.docMgr)
        this.read = this.docMgr.read.bind(this.docMgr)
        this.delete = this.docMgr.delete.bind(this.docMgr)
        this.do = this.cursorMgr.traverse.bind(this.cursorMgr)
    }

    init() {
        this.lineMgr.init()
        this.docMgr.init()
        this.korwa.init()

        this.viewportMgr.init({
            $padding: this.uiMgr.get('lineCntr'),
            y: 0,
            height: this.korwa.measureViewport().height,
            lps: 10,
        })

        this.scroller.init({
            $el: this.uiMgr.get('scroller'),
            y: 0,
            speed: 250,
            min: 0,
        })

        this.selectedMgr.init()
        this.renderer.init()
        this.cursorMgr.init()

        // const resizeObserver = new ResizeObserver(entreis => {
        //     const contentRect = entreis[0].contentRect
        //     console.error(contentRect.height)

        //     this.viewport.height = contentRect.height
        //     this.renderer.render(this.viewport)
        // })

        // resizeObserver.observe(this.uiMgr.get('viewport'))
        // resizeObserver.observe(this.uiMgr.get('beacon'))
        // resizeObserver.observe(this.uiMgr.get('scroller'))

        let ACC = 0
        function genCoord() {
            return new Coord({
                logicalY: ACC++,
            })
        }

        let start = performance.now()
        const contents = []
        for (let i = 0; i < 1; i++) {
            const coord = genCoord()
            contents.push('#' + (coord.logicalY + 1))
        }

        this.docMgr.write(contents)

        const c = new ImageAsset({
            src: aqua,
        })

        c.setNext(new StringAsset('aqua aqua'))

        setTimeout(() => {
            this.docMgr.write(c, {
                logicalY: 11,
                logicalX: 200,
            })
        }, 1000)

        let end = performance.now()
        const write = end - start
        console.info('Write Use time', write)

        start = performance.now()

        // console.error(this.docMgr.getLinesByHeight())


        // setTimeout(() => {
        //     start = performance.now()

        //         console.error('---------------------')
        //         for (let i = 0; i < 100; i++) {
        //             const logicalY = Math.random() < 1 ? this.docMgr.doc.root.size : parseInt(this.docMgr.doc.root.size * Math.random())
        //             this.docMgr.write('Peko', {
        //                 logicalY,
        //             })
        //         }

        //     console.error('Root', this.docMgr.doc.root)
        //     end = performance.now()
        //     console.info('Write Use time', end - start, 'ms')
        // }, 800)

        // end = performance.now()
        // const read = end - start
        // console.info('Read Use time', read)

        // this.docMgr.write(new ImageAsset({
        //     src: 'http://i0.hdslb.com/bfs/face/281753a6f2c08940ce82c36e870633991262a4cf.jpg',
        //     alt: 'aqua',
        // }))

        // const start = performance.now()
        // let i = 0;
        // const sec = 1000
        // for (; performance.now() - start < sec; i++) {
        //     this.docMgr.write(new StringAsset('A'), {
        //         logicalY: i,
        //         logicalX: 0,
        //     })
        // }
        // console.error(`Insert With CustomData ${i / sec * 1000} qps/second`)
        // console.info('this.doc', this.docMgr.doc.root)
// 1   1   1
// 2   3
// 3   4
// 4   5
// 5   6
        // this.khala.on('docUpdated', info => {
        //     const start = performance.now()

        //     console.error('Read Content',
        //         this.docMgr.read(
        //             new Coord({
        //                 logicalY: 0,
        //                 logicalX: 0,
        //             }),

        //             new Coord({
        //                 logicalY: Infinity,
        //                 logicalX: Infinity,
        //             })
        //         )
        //     )
        //     if (info.type === 'write') {
        //         let e = this.contentMgr.tokenize(new Content({
        //             // value: this.optionMgr.get('content'),
        //             value: 'Pekora  \n Ch. 兎田ぺこら',
        //         }))
        //         console.error('tokens', e)
        //         e = this.contentMgr.toElements(e)
        //         console.error('elements', e)
        //         this.lineMgr.insert(e)
        //     }

        //     if (info.type === 'update') {

        //     }

        //     const end = performance.now()
        //     console.warn('Use time: ', end - start)
        // })

        // this.khala.once('docUpdated', () => {
        //     console.error('docUpdated', this.contentMgr.doc)
            // this.cursorMgr.create()

            // this.cursorMgr.traverse(cursor => {
            //     this.selectedMgr.update(cursor)
            // })
        // })
    }

    loadProcessors(Processors) {
        Iterator.iterate(Processors, Processor => {
            this.processorMgr.load(Processor)
        })
    }

    loadOptions(options) {
        this.optionMgr.load(options)
    }

    installPlugins() {

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
                        beacon
                        scroller
                            components
                                fullWidthCntr
                                    selectedCntr
                                lineWidthCntr
                                    measureCntr
                                        lineNumMeasure
                                        modsMeasure
                                    inputerCntr
                                        inputerLocator
                                            inputer
                                    cursorCntr
                                    selectionCntr
                                    lineCntr
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
            this.uiMgr.get('inputer').focus() /* focus() 调用要在设置 $inputer 位置之后哦 */
        })

        this.kizuna.on($viewport, 'mousemove', event => {
            event.preventDefault()
            this.kizuna.filterMousemove(event)
        })

        this.kizuna.on($viewport, 'mouseup', event => {
            event.preventDefault()
            this.kizuna.filterMouseup(event)
            this.uiMgr.get('inputer').focus() /* focus() 调用要在设置 $inputer 位置之后哦 */
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
        this.kizuna.on($inputer, 'input', event => {
            event.preventDefault()
            console.error('event', event)
        })

        this.kizuna.on($inputer, 'keydown', event => {
            // event.preventDefault()
            this.kizuna.filterKeydown(event)
        })

        this.kizuna.on($inputer, 'keyup', event => {
            event.preventDefault()
            this.kizuna.filterKeyup(event)
        })

        this.kizuna.on($inputer, 'copy', event => {
            console.error('copy event', event)
            event.preventDefault()
        })

        this.kizuna.on($inputer, 'cut', event => {
            console.error('cut event', event)
            event.preventDefault()
        })

        this.kizuna.on($inputer, 'paste', event => {
            const items = event.clipboardData.items
            console.error('Paste event.clipboardData', event.clipboardData)

            if (!(event.clipboardData && items)) {
                return
            }

            for (let i = 0, len = items.length; i < len; i++) {
                DataTransferItemHandler.handle(items[i], {
                    text: text => {
                        console.info('text', text)
                    },

                    html: html => {
                        const $test = document.getElementById('con')
                        const regexp = new RegExp(/^(<!--StartFragment-->)([\s\S]*)(<!--EndFragment-->)/, 'gm')

                        const c = regexp.exec(html)[2]
                        console.error(c)
                        $test.innerHTML = c
                        console.info('html', html)
                    },

                    file: file => {
                        console.info('file', file)
                    }
                })
            }

            event.preventDefault()
        })
    }
}

module.exports = Aqua
