const { DOM } = require('../utils/index')
const { SelectedLinePool } = require('../pools/index')
const { SelectedLineRecycle } = require('../recycles/index')

class SelectedMgr {
    constructor(aqua) {
        this.aqua = aqua

        this.doc = aqua.docMgr
        this.selected = Object.create(null)
        this.got = []
    }

    init() {
        this.pool = new SelectedLinePool(SelectedLineRecycle)

        this.aqua.khala.on('actionAfter', (name, payload) => {
            if (payload && payload.mousedown !== true) {
                return
            }

            this.clear()

            this.aqua.cursorMgr.traverse(cursor => {
                this.update(cursor)
            }, {
                update: false,
            })
        })
    }

    /**
     * 1. 该光标有选取内容, 不做高亮处理
     * 2. 该行已经高亮了, 不作高亮处理 // TODO 刷新该行高亮区域
     * @param  {Cursor} cursor
     */
    update(cursor) {
        const lineNum = cursor.logicalY

        /* 1 */
        if (cursor.selection.selectLines !== 0) {
            return
        }

        /* 2 */
        if (this.selected[lineNum]) {
            return
        }

        this.selected[lineNum] = true

        const { top, height } = this.doc.getLineWithHeight(lineNum)
        const data = {
            top,
            height,
        }

        const selectedLine = this.pool.size > 0 ? this.pool.get(data) : this.pool.create(this.aqua.uiMgr.get('selectedCntr'), true, data)

        this.got.push(selectedLine)
    }

    clear() {
        let times = this.got.length

        while(times--) {
            this.pool.put(this.got.pop())
        }

        this.selected = Object.create(null)
    }
}

module.exports = SelectedMgr
