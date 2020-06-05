const { LinePool } = require('../pools/index')
const { LineStatus } = require('../enums/index')
const { DOM, rAF } = require('../utils/index')

class LineRenderer {
    constructor(aqua) {
        this.applyName = 'line'

        this.processor = aqua.processorMgr
        this.lineMgr = aqua.lineMgr
        this.doc = aqua.docMgr

        this.$lineCntr = aqua.uiMgr.get('lineCntr')

        this.pool = new LinePool
    }

    render(viewport, renderArea, oldRenderArea) {
        const oldLines = viewport.lines
        const lines = viewport.lines = this.doc.getLines(renderArea.start, renderArea.end)

        const $diff = this.diff(viewport, lines, oldLines, renderArea, oldRenderArea)
        this.patch($diff)
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
                    this.patchLine(line, $lines[oldIndex])
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
                this.patchLine(line, $line)
            }
        }

        viewport.$lines = $list

        return $list
    }

    patch($lines) {
        const $children = this.$lineCntr.children

        let $index = 0

        // console.info('当前DOM状态', Array.prototype.slice.call($children).map(item => item.textContent))

        for (let i = 0; i < $lines.length; i++) {
            const $line = $lines[i]

            if (!$line.parentNode) {
                $index = $index + 1
                DOM.appendChild(this.$lineCntr, $line, i)
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

                this.removeLine($renderedLine)
                // $renderedLine.remove()
            }
        }

        let leftLines = $children.length - $index // $children.length - 1 - $index + 1

        if (leftLines > 0) {
            while(leftLines--) {
                this.removeLine($children[$index])
                // $children[$index].remove()
            }
        }
    }

    clip($lines, start, end) {
        for (let i = start; i < end; i++) {
            const $line = $lines[i]
            // $line && $line.remove()
            $line && this.removeLine($line)
        }
    }

    patchLine(line, $line) {
        const $code = $line.children[1].firstChild
        $code.innerHTML = ''
        DOM.appendChild($code, this.processor.transformToElements(line))
    }

    removeLine($line) {
        // 可以先判断 $line.parent !== null 确保没有被渲染, 再执行删除, 如果 $line 已经被删除了, 再次被删除 仍然会被放进 linePool 里, 下次取的时候会出问题
        // 但是调用前已经保证了 $line 是扔未被删除的
        // 为了健壮还是做了判断...
        if ($line.parentNode) {
            $line.remove()
            this.pool.put($line)
        }
    }
}

module.exports = LineRenderer
