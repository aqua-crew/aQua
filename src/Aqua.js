const { Khala, Kizuna, Noop, Iterator, DataTransferItemHandler } = require('./utils/index')
const { DefaultOptions } = require('./options/index')
const { Locator, State, LineMgr, ContentMgr, CursorMgr, ActionMgr, OptionMgr, UIMgr, LangMgr, PoolMgr, SelectedMgr, DocMgr, PluginMgr } = require('./components/index')
const { Coord, Content } = require('./models/index')
const Lines = require('./lines/index')
const Cursors = require('./cursors/index')
const Actions = require('./actions/index')
const Options = require('./options/index')
const UI = require('./ui/index')
const Langs = require('./langs/index')
const Recyclings = require('./recyclings/index')
const { Scroller } = require('./plugins/index')

class Aqua {
    constructor(options) {
        this.khala = new Khala
        this.lifetimes = new Khala
        this.kizuna = new Kizuna
        this.state = new State

        this.pluginMgr = new PluginMgr(this)
        this.poolMgr = new PoolMgr(this)
        this.selectedMgr = new SelectedMgr(this)
        this.optionMgr = new OptionMgr(this)
        this.uiMgr = new UIMgr(this)
        this.locator = new Locator(this)
        this.lineMgr = new LineMgr(this)
        this.cursorMgr = new CursorMgr(this)
        this.actionMgr = new ActionMgr(this)
        this.langMgr = new LangMgr(this)
        this.contentMgr = new ContentMgr(this)
        this.docMgr = new DocMgr(this)

        window.doc = this.docMgr.doc.root

        this.loadOptions(Options)
        this.loadOptions(options)
        this.installPlugins()
        this.lifetimes.emit('setup', this)
        this.loadPools(Recyclings)
        this.loadUI(UI)
        this.mountUI()
        this.lifetimes.emit('mounted', this)

        this.loadLangs(Langs)
        this.loadLines(Lines)
        this.loadCursors(Cursors)
        this.loadActions(Actions)
        this.loadViewportEvents()
        this.loadInputerEvents()

        window.state = this.state
        window.aqua = this

        this.lifetimes.emit('ready', this)
        this.init()
    }

    init() {
        this.docMgr.init()
        this.selectedMgr.init()

        this.khala.on('docUpdated', info => {
            const start = performance.now()

            console.error('Read Content',
                this.docMgr.read(
                    new Coord({
                        logicalY: 0,
                        logicalX: 0,
                    }),

                    new Coord({
                        logicalY: Infinity,
                        logicalX: Infinity,
                    })
                )
            )
            if (info.type === 'write') {
                let e = this.contentMgr.tokenize(new Content({
                    // value: this.optionMgr.get('content'),
                    value: 'Pekora  \n Ch. 兎田ぺこら',
                }))
                console.error('tokens', e)
                e = this.contentMgr.toElements(e)
                console.error('elements', e)
                this.lineMgr.insert(e)
            }

            if (info.type === 'update') {

            }

            const end = performance.now()
            console.warn('Use time: ', end - start)
        })

        this.docMgr.write(new Content({
            value: this.optionMgr.get('content'),
        }))

        this.docMgr.write(new Content({
            value: '君は綺麗だ',
        }))

        this.khala.emit('docUpdated', {
            type: 'update'
        })
        // this.cursorMgr.create()

        // this.khala.once('docUpdated', () => {
        //     console.error('docUpdated', this.contentMgr.doc)
        //     this.cursorMgr.create()

        //     this.cursorMgr.traverse(cursor => {
        //         this.selectedMgr.update(cursor)
        //     })
        // })
    }

    loadPools(Recyclings) {
        Iterator.iterate(Recyclings, Recycling => {
            this.poolMgr.load(Recycling)
        })
    }

    loadLangs(Langs) {
        Iterator.iterate(Langs, lang => {
            this.langMgr.load(lang)
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
                        components
                            inputerCntr
                                inputerLocator
                                    inputer
                            cursorCntr
                            selectedCntr
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
            console.error('event', 1)
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

        this.kizuna.on($inputer, 'input', event => {
            event.preventDefault()
            this.kizuna.filterInput(event)
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
