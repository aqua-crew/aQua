const { CursorChain } = require('../models/index')
const { ArgOpt } = require('../enums/index')

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

    pureTraverse(cb, start = 0, end = this.size, cursors = this.cursors) {
        for (let i = start; i < end; i++) {
            cb(cursors[i])
        }
    }

    traverse(cb, {
        viewport = this.aqua.viewport,
        cursors = this.cursors,
        filter = cursor => true,
        acc = true,
        force = false,
        detect = true,
        after = null,
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

            const coordBefore = cursor.coord.extract()

            filter(cursor) && cb(cursor)

            const coordAfter = cursor.coord.extract()

            accCoord.y = coordAfter.y - coordBefore.y
            accCoord.x = coordAfter.x - coordBefore.x
        }

        detect && this.detect() /* 检测光标与选区的冲突 */
        after && after()

        this.aqua.renderer.renderGroup('standard', viewport)
        this.aqua.renderer.render('tracker', viewport)
    }

    create(coord = null, setPrimary = true, modName = 'Anchor') {
        const Cursor = this.mods[modName]
        const cursor = new Cursor(this.aqua)

        if (coord) {
            cursor.coord.assign(coord)
        }

        setPrimary && this.setPrimary(cursor)
        this.cursors.push(cursor)

        this.resort()

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

    resort(cursors = this.cursors) {
        cursors.sort((cursorA, cursorB) => {
            const diffY = cursorA.y - cursorB.y

            return diffY === 0 ? cursorA.x - cursorB.x : diffY
        })
    }

    detectCursorCoordOverlay(cursor = this.primary, cursors = this.cursors) {
        if (cursors.length < 2) {
            return null
        }

        const index = cursors.indexOf(cursor)

        if (index === -1) {
            // #Error
        }

        const coord = cursor.coord
        const prev = cursors[index - 1]

        if (prev) {
            if (prev.selection.isCollapsed()) {
                if (coord.equal(prev.coord)) {
                    return prev
                }
            } else {
                if (coord.less(prev.selection.end)) {
                    return prev
                }
            }
        }

        const next = cursors[index + 1]

        if (next) {
            if (next.selection.isCollapsed()) {
                if (coord.equal(next.coord)) {
                    return next
                }
            } else {
                if (coord.greater(next.selection.start)) {
                    return next
                }
            }
        }

        return null
    }

    detectCursorSelectionOverlay(cursor = this.primary, cursors = this.cursors) {
        const overlayCursors = []

        if (cursors.length < 2) {
            return overlayCursors
        }

        const index = cursors.indexOf(cursor)

        if (index === -1) {
            // #Error
        }

        const selection = cursor.selection

        if (selection.isCollapsed()) {
            return overlayCursors
        }

        const direction = cursor.selection.direction

        if (direction === ArgOpt.SelectionDirectionIsTopLeft) {
            for (let i = index - 1; i >= 0; i--) {
                const prev = cursors[i]

                if (prev.selection.isCollapsed()) {
                    if (prev.coord.greater(selection.start)) {
                        overlayCursors.push(prev)

                        continue
                    }

                    return overlayCursors
                } else {
                    if (prev.selection.end.greater(selection.start)) {
                        overlayCursors.push(prev)

                        continue
                    }

                    return overlayCursors
                }
            }

            return overlayCursors
        }

        if (direction === ArgOpt.SelectionDirectionIsBottomRight) {
            for (let i = index + 1; i < cursors.length; i++) {
                const next = cursors[i]

                if (next.selection.isCollapsed()) {
                    if (next.coord.less(selection.end)) {
                        overlayCursors.push(next)

                        continue
                    }

                    return overlayCursors
                } else {
                    if (next.selection.start.less(selection.end)) {
                        overlayCursors.push(next)

                        continue
                    }

                    return overlayCursors
                }
            }
        }

        // #Error
        return overlayCursors
    }

    detect(cursors = this.cursors) {
        if (cursors.length < 2) {
            return
        }

        const remover = this.useDelayRemover()

        for (let i = 0; i < cursors.length - 1; i++) {
            const current = cursors[i]
            const next = cursors[i + 1]
            const currentSelection = current.selection
            const nextSelection = next.selection

            if (currentSelection.isCollapsed()) { // 当前光标没选区
                if (nextSelection.isCollapsed()) { // 下一个光标也没选区
                    if (current.coord.equal(next.coord)) { // 重叠了就删除当前的光标
                        remover.push(current, next)
                    }

                    continue
                } else { // 下一个光标有选区
                    if (current.coord.greater(nextSelection.start, ArgOpt.ContainEqual)) { // 但是当前光标的位置比下一个选区的起点还大
                        remover.push(current, next)

                        continue
                    }
                }
            } else { // 当前光标有选区
                if (nextSelection.isCollapsed()) { // 下一个光标没选区
                    if (currentSelection.end.greater(next.coord, ArgOpt.ContainEqual)) { // 但是当前光标得选区终点比下一个光标还大
                        next.merge(current)
                        remover.push(current, next)

                        continue
                    }
                } else { // 下一个光标有选区
                    if (currentSelection.end.greater(nextSelection.start)) { // 但是当前光标得选区终点比下一个光标的选区起点还大
                        next.merge(current)
                        remover.push(current, next)

                        continue
                    }
                }
            }
        }

        remover.remove()
    }

    /* Tool */
    useDelayRemover(list = [], primaryCandidate = null) {
        const push = (cursor, fromCursor) => {
            if (this.isPrimary(cursor)) {
                primaryCandidate = fromCursor
            }

            list.push(cursor)
        }

        const remove = (setPrimary = true) => {
            setPrimary && primaryCandidate && this.setPrimary(primaryCandidate)
            list.length > 0 && this.remove(list)

            return list
        }

        return {
            push,
            remove,
        }
    }

    usePhantom(cb, modName = 'Anchor') {
        const Cursor = this.mods[modName]
        cb(new Cursor(this.aqua))
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
