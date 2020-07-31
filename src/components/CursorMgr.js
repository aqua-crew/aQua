const { ArgOpt } = require('../enums/index')
const { CoordHelper } = require('../helpers/index')

class ObjectMap {
    constructor() {
        this.arr = []
        this.map = Object.create(null)
    }

    get size() {
        return this.arr.length
    }

    useIterator(str) {
        const map = this.map
        const arr = this.arr
        let i = -1
        let index = -1

        return function() {
            i = i + 1

            index = arr[i]

            if (i > arr.length - 1) {
                i = arr.length - 1

                return null
            }

            return {
                key: index,
                value: map[index],
            }
        }
    }

    traverse(cb) {
        const arr = this.arr

        for (let i = 0; i < arr.length; i++) {
            cb(arr[i])
        }
    }

    getByIndex(index) {
        return this.map[this.arr[index]]
    }

    get(key) {
        return this.map[key]
    }

    set(key, value) {
        this.binaryInsert(key)
        this.map[key] = value
    }

    binaryInsert(key) {
        const arr = this.arr

        if (arr.length === 0) {
            arr.push(key)

            return
        }

        let right = arr.length - 1

        if (key > arr[right]) {
            arr.push(key)

            return
        }

        let left = 0

        if (key < arr[left]) {
            arr.unshift(key)

            return
        }

        let center = -1

        while (right - left > 1) {
            center = parseInt((left + right) / 2)

            if (key < arr[center]) {
                right = center - 1
            } else {
                left = center + 1
            }
        }

        if (key < arr[left]) {
            arr.splice(left, 0, key)

            return
        }

        if (key > arr[right]) {
            arr.splice(right, 0, key)

            return
        }

        arr.splice(left + 1, 0, key)
    }

    reset() {
        this.arr = []
        this.map = Object.create(null)
    }
}

class OffsetMap {
    constructor() {
        this.map = new ObjectMap
    }

    get size() {
        return this.map.size
    }

    traverse(cb) {
        const map = this.map

        map.traverse(y => {
            const xObjectMap = map.get(y)

            xObjectMap.traverse(x => {
                cb({ y, x }, xObjectMap.get(x))
            })
        })
    }

    useIterator() {
        const yAndXObjectMapGenerator = this.map.useIterator('Y')

        let isGenerateNextYObjectMap = true

        let yAndXObjectMap = null
        let xAndOffsetCoord = null

        let xAndOffsetCoordGenerator = null
        let isGenerateXAndOffsetMapGenerator = true

        let isLastY = false

        // const next = function() {
        //     let curYAndXObjectMap = null

        //     if (isGenerateNextYObjectMap) {
        //         curYAndXObjectMap = yAndXObjectMapGenerator()

        //         if (!curYAndXObjectMap) {
        //             isGenerateNextYObjectMap = true
        //             isLastY = true
        //         } else {
        //             isGenerateNextYObjectMap = false
        //             yAndXObjectMap = curYAndXObjectMap
        //             isLastY = false
        //         }
        //     }

        //     /* 初次 next, yAndXObjectMap 可能是 null */
        //     if (!yAndXObjectMap) {
        //         return null
        //     }

        //     const { key: y, value: xObjectMap } = yAndXObjectMap

        //     if (isGenerateXAndOffsetMapGenerator) {
        //         console.warn('使用了新的 xOffsetMap')
        //         xAndOffsetCoordGenerator = xObjectMap.useIterator('X')

        //         isGenerateXAndOffsetMapGenerator = false
        //     }

        //     xAndOffsetCoord = xAndOffsetCoordGenerator()

        //     if (!xAndOffsetCoord) {
        //         isGenerateNextYObjectMap = true
        //         isGenerateXAndOffsetMapGenerator = true

        //         return isLastY ? null : next()
        //     }

        //     return {
        //         start: {
        //              y,
        //              x: xAndOffsetCoord.key,
        //          },
        //         offsetCoord: xAndOffsetCoord.value,
        //     }
        // }

        let y = -1

        const next = function() {
            let xAndOffsetCoord = null

            /* 没有 x 生成器, 从当前 y 生成器拿一个 */
            if (xAndOffsetCoordGenerator) {
                /* 尝试拿到下一个 x */
                xAndOffsetCoord = xAndOffsetCoordGenerator()
            }

            /* 有当前 y 下 x 生成器, 且拿到了下一个 */
            if (xAndOffsetCoord) {
                return {
                    start: {
                         y,
                         x: xAndOffsetCoord.key,
                     },
                    offsetCoord: xAndOffsetCoord.value,
                }
            }

            /* 再试一次, 可能只是当前 y 下的 xObjectMap 到头了, 但是下一个 y 可能有 */
            yAndXObjectMap = yAndXObjectMapGenerator()

            /* 下一个 y 也没有 */
            if (!yAndXObjectMap) {
                return null
            }

            /* 惊了 */
            // const { key: y, value: xObjectMap } = yAndXObjectMap

            y = yAndXObjectMap.key
            xAndOffsetCoordGenerator = yAndXObjectMap.value.useIterator('X')

            return next()
        }

        return next
    }

    get(coord) {
        const xObjectMap = this.map.get(coord.y)

        if (!xObjectMap) {
            return null
        }

        const offsetCoord = xObjectMap.get(coord.x)

        if (!offsetCoord) {
            return null
        }

        return offsetCoord
    }

    add(coord, offsetCoord) {
        let xObjectMap = this.map.get(coord.y)

        if (!xObjectMap) {
            xObjectMap = new ObjectMap

            this.map.set(coord.y, xObjectMap)
            xObjectMap.set(coord.x, offsetCoord)

            return
        }

        const prevOffsetCoord = xObjectMap.get(coord.x)

        if (!prevOffsetCoord) {
            xObjectMap.set(coord.x, offsetCoord)

            return
        }

        prevOffsetCoord.y = prevOffsetCoord.y + offsetCoord.y
        prevOffsetCoord.x = prevOffsetCoord.x + offsetCoord.x
    }

    reset() {
        this.map.reset()
    }
}

class CursorMgr {
    constructor(aqua) {
        this.aqua = aqua

        this.primary = null
        this.mods = Object.create(null)
        this.cursors = []

        this.offsetMap = new OffsetMap
    }

    init() {
        this.create()

        this.traverse(cursor => {
            cursor.y = 0
            cursor.x = 0
        })

        this.aqua.khala.on('microEvent', data => {
            const { source, start, end } = data

            if (source === 'write') {
                this.offsetMap.add(start, {
                    y: end.y - start.y,
                    x: end.x - start.x,
                })

                return
            }

            if (source === 'delete') {
                this.offsetMap.add(start, {
                    y: start.y - end.y,
                    x: start.x - end.x,
                })

                return
            }
        })
    }

    get size() {
        return this.cursors.length
    }

    setPrimary(cursor) {
        this.primary = cursor
    }

    getPrimary(cb) {
        cb && cb(this.primary)

        return this.primary
    }

    isPrimary(cursor) {
        return cursor === this.primary
    }

    pureTraverse(cb, start = 0, end = this.size, cursors = this.cursors) {
        for (let i = start; i < end; i++) {
            if (cb(cursors[i]) === false) {
                return
            }
        }
    }

    traverse(cb, {
        viewport = this.aqua.viewport,
        cursors = this.cursors,
        filter = cursor => true,
        force = false,
        detect = true,
        after = null,
        track = true,
    } = {}) {
        const start = performance.now()

        const flusher = this.useFlushOffsetIterator()

        for (let i = 0; i < cursors.length; i++) {
            const cursor = cursors[i]

            flusher.next(cursor)
            filter(cursor) && cb(cursor)
        }

        detect && this.detect() /* 检测光标与选区的冲突 */
        after && after()
        flusher.reset()

        const end = performance.now()

        console.error("Use TIme", end - start)

        this.aqua.renderer.renderGroup('standard', viewport)
        track && this.aqua.renderer.render('tracker', viewport)
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

    getCursorsCoord() {
        const coords = []

        this.pureTraverse(cursor => {
            coords.push(cursor.coord.extract())
        })

        return coords
    }

    flushOffset() {
        const flusher = this.useFlushOffsetIterator()

        if (!flusher) {
            return
        }

        this.pureTraverse(cursor => {
            flusher.next(cursor)
        })


        flusher.reset()
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
                    if (currentSelection.end.greater(next.coord, ArgOpt.ContainEqual)) { // 但是当前光标的选区终点比下一个光标还大
                        next.merge(current)
                        remover.push(current, next)

                        continue
                    }
                } else { // 下一个光标有选区
                    if (currentSelection.end.greater(nextSelection.start)) { // 但是当前光标的选区终点比下一个光标的选区起点还大
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

    usePhantom(modName = 'Anchor') {
        const Cursor = this.mods[modName]

        return new Cursor(this.aqua)
    }

    useFlushOffsetIterator() {
        const offsetMap = this.offsetMap
        const offsetCoordGenerator = offsetMap.useIterator()

        let yAcc = 0
        let xAcc = 0

        let lastY = -1
        let isTerminate = false
        let nextOffsetCoord = null

        return {
            next(cursor) {
                const offsetUpdater = cursor.useOffsetUpdater()
                const coord = cursor.coord.clone()

                coord.y = coord.y + yAcc
                coord.x = coord.x + xAcc

                while(true) {
                    if (!isTerminate) {
                        nextOffsetCoord = offsetCoordGenerator()
                    }

                    if (!nextOffsetCoord) {
                        break
                    }

                    const { start, offsetCoord } = nextOffsetCoord

                    if (CoordHelper.less(coord, start, ArgOpt.ContainEqual)) {
                        isTerminate = true

                        break
                    }

                    yAcc = yAcc + offsetCoord.y

                    if (lastY !== offsetCoord.y) {
                        xAcc = 0
                    }

                    xAcc = xAcc + offsetCoord.x

                    lastY = start.y

                    isTerminate = false
                }

                if (yAcc !== 0) {
                    offsetUpdater.setY(yAcc)
                }

                if (xAcc !== 0 && coord.y === lastY) {
                    offsetUpdater.setX(xAcc)
                }

                cursor.updateOffset(offsetUpdater.flush())
            },

            reset() {
                offsetMap.reset()
            },
        }
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
