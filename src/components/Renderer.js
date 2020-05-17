const { LineHelper } = require('../helpers/index')
const { LineStatus } = require('../enums/index')
const { LinePool } = require('../pools/index')
const { DOM, rAF } = require('../utils/index')

class Renderer {
    constructor(aqua) {
        this.aqua = aqua

        this.processor = aqua.processorMgr
        this.lineMgr = aqua.lineMgr
        this.doc = aqua.docMgr
        this.korwa = aqua.korwa

        this.pool = new LinePool
    }

    init() {
        const viewport = this.aqua.viewport
        const docWatcher = this.aqua.docWatcher
        const khala = this.aqua.khala

        let lastChange = 0

        // this.pool.init(40)

        let timeoutId = null
        docWatcher.off('change')
        docWatcher.on('change', data => {
            const lines = data.effectLines

            LineHelper.setHeight(lines, this.korwa.measureLinesHeight(lines))
            docWatcher.emit('resize', lines)

            clearTimeout(timeoutId)
            if (new Date().getTime() - lastChange > 16) {
                this.render(viewport, true)
            } else {
                timeoutId = setTimeout(() => {
                    this.render(viewport, true)
                }, 8)
            }

            lastChange = new Date().getTime()
            // this.aqua.uiMgr.get('beacon').style.height = count + 'px'
        })

        khala.off('scroll')
        khala.on('scroll', (y, lastY = -1) => {
            console.log('y, lastY', y, lastY)
            // if (y === lastY) {
            //     return
            // }

            viewport.update(y)

            this.render(viewport)
        })
    }

    render(viewport = this.aqua.viewport, force = false) {
        const start = this.doc.getLineByHeight(viewport.ceiling).staticLineNum
        const end = this.doc.getLineByHeight(viewport.floor, true).staticLineNum + 1

        const visibleArea = viewport.updateVisibleArea(start, end)

        console.info(visibleArea, viewport.renderArea)

        if (!force && !viewport.isVisionLost()) {
            return
        }

        const renderStart = this.doc.correctLineNumAsIndex(visibleArea.start - viewport.lps)
        const renderEnd = this.doc.correctLineNumAsIndex(visibleArea.end + viewport.lps)
        const oldRenderArea = viewport.getRenderArea()
        const renderArea = viewport.updateRenderArea(renderStart, renderEnd)

        const oldLines = viewport.lines
        const lines = viewport.lines = this.doc.getLines(renderStart, renderEnd)

        const $diff = this.diff(viewport, lines, oldLines, renderArea, oldRenderArea)
        this.patch($diff)

        this.updateLineNum(viewport)
        const padding = this.doc.getLineWithHeight(renderArea.start).top
        viewport.pad(padding)
    }

    updateLineNum(viewport) {
        const $lines = viewport.$lines
        const { start } = viewport.renderArea

        for (let i = 0; i < $lines.length; i++) {
            this._updateLineNum($lines[i], start + i + 1)
        }
    }

    patch($lines) {
        const $lineCntr = this.lineMgr.$cntr
        const $children = this.lineMgr.$children
        let $index = 0

        // console.info('当前DOM状态', Array.prototype.slice.call($children).map(item => item.textContent))

        for (let i = 0; i < $lines.length; i++) {
            const $line = $lines[i]

            if (!$line.parentNode) {
                $index = $index + 1
                DOM.appendChild($lineCntr, $line, i)
                // console.warn('需要渲染的行', $line.textContent)
                continue
            }

            const $renderedLine = $children[$index]

            if (!$renderedLine) {
                console.error('诶?', $index)
                continue
            }

            if ($line === $renderedLine) {
                // console.info('已渲染的行', $renderedLine.textContent)
                $index = $index + 1
                continue
            }

            if ($line !== $renderedLine) {
                // console.warn('需要删除的行', $renderedLine.textContent)
                i = i - 1

                this._removeLine($renderedLine)
                // $renderedLine.remove()
            }
        }

        let leftLines = $children.length - $index // $children.length - 1 - $index + 1

        if (leftLines > 0) {
            while(leftLines--) {
                this._removeLine($children[$index])
                // $children[$index].remove()
            }
        }
    }

    /**
     * 1. 如果行号不相同, 直接去除
     * 2. 比较行号相同的部分, 返回需要渲染的 DOM 数组
     */
    diff(viewport, lines, oldLines, renderArea, oldRenderArea) {
        // console.log('新渲染区域', lines)
        // console.log('旧渲染区域', oldLines)

        let oldIndex = 0
        let oldIndexMax = 0

        const $list = []

        const { start, end } = renderArea
        const { start: oStart, end: oEnd } = oldRenderArea

        /* 1 */
        if (end > oEnd && start >= oStart && start <= oEnd) {
            this.clip(viewport.$lines, 0,  start - oStart)
            oldIndex = start - oStart
            oldIndexMax = oEnd - oStart
            // console.warn('Enter 1', oldIndex, oldIndexMax)
        } else if (start < oStart && end >= oStart && end <= oEnd) {
            this.clip(viewport.$lines, end - oStart, oEnd - oStart)
            oldIndex = 0
            oldIndexMax = end - oStart
            // console.warn('Enter 2', oldIndex, oldIndexMax)
        } else if (end < oStart || start > oEnd) {
            this.clip(viewport.$lines, 0, oEnd - oStart)
            oldIndex = 0
            oldIndexMax = 0
            // console.warn('Enter 3', oldIndex, oldIndexMax)
        } else if (start < oStart && end > oEnd) {
            oldIndex = 0
            oldIndexMax = oEnd - oStart
            // console.warn('Enter 4', oldIndex, oldIndexMax)
        } else { // start >= oStart && end <= oEnd
            this.clip(viewport.$lines, 0,  start - oStart)
            this.clip(viewport.$lines, end - oStart, oEnd - oStart)
            oldIndex = start - oStart
            oldIndexMax = end - oStart
            // console.warn('Enter 5', oldIndex, oldIndexMax)
        }

        let curIndex = 0

        const $lines = viewport.$lines

        /* 2 */
        for (; curIndex < lines.length; curIndex++) {
            const oldLine = oldIndex < oldIndexMax ? oldLines[oldIndex] : null
            const line = lines[curIndex]
            const status = line.status

            line.setStatus(LineStatus.DONE)

            if (line === oldLine) {
                $list[curIndex] = $lines[oldIndex]

                if (status === LineStatus.DONE) {
                    oldIndex = oldIndex + 1

                    continue
                } else if (status === LineStatus.UPDATED) {
                    this._patchLine(line, $lines[oldIndex])
                    oldIndex = oldIndex + 1
                }
            } else {
                if (oldLine) {
                    let oldStatus = oldLine.status
                    let hasDeleted = false

                    if (oldStatus === LineStatus.DELETED) {
                        curIndex = curIndex - 1
                        hasDeleted = true
                    }

                    while (oldStatus === LineStatus.DELETED) {
                        oldIndex = oldIndex + 1

                        if (oldIndex < oldIndexMax) {
                            oldStatus = oldLines[oldIndex].status
                        } else {
                            break
                        }
                    }

                    if (hasDeleted) {
                        continue
                    }
                }

                const $line = this.pool.size > 0 ? this.pool.get() : this.lineMgr.create()
                $list[curIndex] = $line
                this._patchLine(line, $line)
            }
        }

        viewport.$lines = $list

        return $list
    }

    clip($lines, start, end) {
        for (let i = start; i < end; i++) {
            const $line = $lines[i]
            // $line && $line.remove()
            $line && this._removeLine($line)
        }
    }

    _patchLine(line, $line) {
        const $code = $line.children[1].firstChild
        $code.innerHTML = ''
        DOM.appendChild($code, this.processor.transformToElements(line))
    }

    _removeLine($line) {
        // 可以先判断 $line.parent !== null 确保没有被渲染, 再执行删除, 如果 $line 已经被删除了, 再次被删除 仍然会被放进 pool 里, 下次取的时候会出问题
        // 但是调用前已经保证了 $line 是扔未被删除的
        // 为了健壮还是做了判断...
        if ($line.parentNode) {
            $line.remove()
            this.pool.put($line)
        }
    }

    _updateLineNum($line, lineNum) {
        rAF(() => {
            $line.firstChild.textContent = lineNum
        })
    }
}

module.exports = Renderer
