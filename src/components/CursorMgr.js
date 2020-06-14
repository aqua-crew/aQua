class CursorMgr {
    constructor(aqua) {
        this.aqua = aqua

        this.primary = null
        this.mods = Object.create(null)
        this.cursors = []
    }

    init() {
        this.create()
        this.traverse(cursor => {
            cursor.y = 0
            cursor.x = 0
        })
    }

    get size() {
        return this.cursors.length
    }

    setPrimary(cursor) {
        this.primary = cursor
    }

    isPrimary(cursor) {
        return cursor === this.primary
    }

    getPrimary(cb) {
        cb(this.primary)
    }

    pureTraverse(cb, cursors = this.cursors) {
        for (let i = 0; i < cursors.length; i++) {
            cb(cursors[i])
        }
    }

    traverse(cb, {
        viewport = this.aqua.viewport,
        cursors = this.cursors,
        filter = cursor => true,
        acc = true,
        force = false,
    } = {}) {
        const accCoord = {
            y: 0,
            x: 0,
        }

        for (let i = 0; i < cursors.length; i++) {
            const cursor = cursors[i]

            if (acc) {
                if (accCoord.y !== 0) { // cursor.y 的 set 会进行 inside 计算, 这里做判断避免多余的计算
                    cursor.y = cursor.y + accCoord.y
                }

                if (accCoord.y !== 0) {
                    cursor.x = cursor.x + accCoord.x
                }
            }

            const before = cursor.coord.clone()

            filter(cursor) && cb(cursor)

            const after = cursor.coord.clone()

            accCoord.y = after.y - before.y
            accCoord.x = after.x - before.x
        }

        this.aqua.renderer.render('cursor', viewport)
        this.aqua.renderer.render('tracker', viewport)
        this.aqua.renderer.render('inputer', viewport)
        this.aqua.renderer.render('selection', viewport)
        this.aqua.renderer.render('selectedLine', viewport)

        // this.detect() /* 检测光标与选区的冲突 */

        return this
    }

    create(name = 'Anchor', coord = null) {
        const Cursor = this.mods[name]
        const cursor = new Cursor(this.aqua)

        if (coord) {
            cursor.coord.assign(coord)
        }

        this.setPrimary(cursor)
        this.cursors.push(cursor)

        return cursor
    }

    removeAll(exceptions = this.primary) {
        if (!Array.isArray(exceptions)) {
            exceptions = [exceptions]
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
                this.cursors.splice(index, 1)
            }
        }
    }

    resort() {
        this.cursors.sort((cursorA, cursorB) => {
            const minusY = cursorA.y - cursorB.y

            return minusY === 0 ? cursorA.x - cursorB.x : minusY
        })
    }

    detect() {

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

    // transform(cursor) {

    // }
}

module.exports = CursorMgr
