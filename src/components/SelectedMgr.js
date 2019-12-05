const { DOM } = require('../utils/index')

class SelectedMgr {
    constructor(aqua) {
        this.aqua = aqua

        this.selected = Object.create(null)
        this.got = []
    }

    init() {
        this.pool = this.aqua.poolMgr.create('SelectedLine')

        this.aqua.khala.on('actionAfter', (name, payload) => {
            if (payload && payload.mousedown !== true) {
                return
            }

            this.clear()

            this.aqua.cursorMgr.traverse(cursor => {
                this.update(cursor)
            })
        })
    }

    /**
     * 1. 该光标有选取内容, 不做高亮处理
     * 2. 该行已经高亮了, 不作高亮处理
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

        const data = {
            top: this.aqua.lineMgr.getTop(lineNum),
            height: this.aqua.contentMgr.getLineIns(lineNum).height,
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
