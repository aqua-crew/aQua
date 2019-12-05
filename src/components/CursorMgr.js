class CursorMgr {
    constructor(aqua) {
        this.aqua = aqua

        this.main = null
        this.mods = Object.create(null)
        this.cursors = []
    }

    get size() {
        return this.cursors.length
    }

    /**
     * Line 与 Mode 存的是实例, 因为他们是一个 Handler. Cursor 存的是构造函数, 因为需要返回实例
     * @param  {Cursor} Cursor [Cursor 的构造函数]
     * @return {CursorMgr}
     */
    load(Cursor) {
        const name = Cursor.name
        this.mods[name] = Cursor

        if (!this.aqua.state.mod.cursor) {
            this.aqua.state.mod.cursor = Cursor
        }

        return this
    }

    /**
    const options = {
        filter: () => true
    }
    */
    traverse(cb, {
        cursors = this.cursors,
        filter = cursor => true,
        acc = true,
    } = {}) {
        const accCoord = {
            logicalY: 0,
            logicalX: 0,
        }

        for (let i = 0; i < cursors.length; i++) {
            const cursor = cursors[i]

            if (acc) {
                cursor.logicalY = cursor.logicalY + accCoord.logicalY
                cursor.logicalX = cursor.logicalX + accCoord.logicalX
            }

            const before = cursor.coord.clone()

            filter(cursor) && cb(cursor)

            cursor.updateCoord()
            cursor.updateSelection()

            const after = cursor.coord.clone()

            accCoord.logicalY = after.logicalY - before.logicalY
            accCoord.logicalX = after.logicalX - before.logicalX
        }

        // this.detect() /* 检测光标与选区的冲突 */
        // this.updateUI() /* 渲染光标视图 */

        // this.aqua.uiMgr.get('inputerLocator').style.cssText = `top: 0; left: 0; display: none;` // 重新渲染输入框位置的预置条件
        this.aqua.uiMgr.get('inputerLocator').style.cssText = `top: ${this.main.physicalY}px; left: ${this.main.physicalX}px; display: block;`

        return this
    }

    create(name = 'Anchor', coord = null) {
        const Cursor = this.mods[name]
        const cursor = new Cursor(this.aqua)

        if (coord) {
            cursor.coord.assign(coord)
        }

        // cursor.id = Math.random().toString(36).substr(2)

        this.main = cursor
        this.cursors.push(cursor)

        // console.info('this.cursors', this.cursors.map(cursor => cursor.id))

        return cursor
    }

    removeAll(exceptions = this.main) {
        if (!Array.isArray(exceptions)) {
            exceptions = [exceptions]
        }

        for (let i = 0; i < exceptions.length; i++) {
            const cursor = exceptions[i]
            cursor.cure()
        }

        const cursors = this.cursors
        for (let i = 0; i < cursors.length; i++) {
            const cursor = cursors[i]
            cursor.release()
        }

        this.cursors = exceptions
    }

    remove(cursors) {
        if (!Array.isArray(cursors)) {
            cursors = [cursors]
        }

        for (let i = 0; i < cursors.length; i++) {
            const cursor = cursors[i]
            const index = this.cursors.indexOf(cursor)

            if (index !== -1) {
                cursor.release()
                this.cursors.splice(index, 1)
            }
        }
    }

    resort() {
        this.cursors.sort((cursorA, cursorB) => {
            const minusY = cursorA.logicalY - cursorB.logicalY

            return minusY === 0 ? cursorA.logicalX - cursorB.logicalX : minusY
        })
    }

    detect() {

    }

    transform(cursor) {

    }
}

module.exports = CursorMgr
