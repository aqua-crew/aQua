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

            const max = arr.length - 1

            if (i > max) {
                i = max

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
        let xAndOffsetCoordGenerator = null

        let yAndXObjectMap = null
        let lastXAndOffsetCoord = null
        let offsetCoordList = null

        let offsetIndex = -1
        let y = -1
        let x = -1

        const that = this

        const next = function() {
            if (offsetCoordList) {
                /* 尝试拿到下一个 offsetCoord */
                const offsetCoord = offsetCoordList[offsetIndex + 1]

                /* 拿到了就直接返回 */
                if (offsetCoord) {
                    offsetIndex = offsetIndex + 1

                    return {
                        start: {
                            y,
                            x,
                        },
                        offsetCoord,
                    }
                }
            }

            let xAndOffsetCoord = null

            /* 如果没有的话, 尝试拿到下一个 x 下的 offsetCoordList */
            /* 没有 x 生成器, 从当前 y 生成器拿一个 */
            if (xAndOffsetCoordGenerator) {
                /* 尝试拿到下一个 x */
                xAndOffsetCoord = xAndOffsetCoordGenerator()
            }

            /* 有当前 y 下 x 生成器, 且拿到了下一个 */
            if (xAndOffsetCoord) {
                x = xAndOffsetCoord.key
                offsetCoordList = xAndOffsetCoord.value
                offsetIndex = -1

                return next()
            }

            /* 再试一次, 可能只是当前 y 下的 xObjectMap 到头了, 但是下一个 y 可能有 */
            yAndXObjectMap = yAndXObjectMapGenerator()

            /* 下一个 y 也没有 */
            if (!yAndXObjectMap) {
                return null
            }

            /* 惊了, 有了 */
            y = yAndXObjectMap.key
            xAndOffsetCoordGenerator = yAndXObjectMap.value.useIterator('X')

            xAndOffsetCoord = xAndOffsetCoordGenerator()
            x = xAndOffsetCoord.key
            offsetCoordList = xAndOffsetCoord.value
            offsetIndex = -1

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

    /**
     * 1. 标记一个 offsetCoord 被更新过了, 以便当使用 useIterator 的时候, 保证这个更新过的 offsetCoord 不会被跳过
     * 2. 标记一个 offsetCoord 的 x 偏移量
     * @param {CoordLike} coord       [偏移起始点]
     * @param {CoordLike} offsetCoord [偏移坐标向量]
     */
    add(coord, offsetCoord) {
        let xObjectMap = this.map.get(coord.y)

        if (!xObjectMap) {
            xObjectMap = new ObjectMap

            this.map.set(coord.y, xObjectMap)
            xObjectMap.set(coord.x, [offsetCoord])

            return
        }

        const prevOffsetCoord = xObjectMap.get(coord.x)

        if (!prevOffsetCoord) {
            xObjectMap.set(coord.x, [offsetCoord])

            return
        }

        xObjectMap.get(coord.x).push(offsetCoord)
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
        console.group('action start')

        const flusher = this.useFlushOffsetIterator()

        for (let i = 0; i < cursors.length; i++) {
            console.group('当前光标序号', i)
            const cursor = cursors[i]

            flusher.next(cursor)

            filter(cursor) && cb(cursor)
            console.groupEnd('当前光标序号', i)
        }

        detect && this.detect() /* 检测光标与选区的冲突 */
        after && after()
        flusher.reset()

        console.groupEnd('action start')

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

    /**
     * 用于检测 cursor 在 cursors 中是否重合, 返回与其重合的光标列表
     * @param  {Cursor} cursor  [检测的光标]
     * @param  {Array<Cursor>} cursors [光标处于的光标列表]
     * @return {Array<Cursor>}         [与 cursor 重合的光标]
     */
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

    /**
     * 用于检测 cursor 与其 selection 在 cursors 中是否重合, 返回与其重合的光标列表
     * @param  {Cursor} cursor  [检测的光标]
     * @param  {Array<Cursor>} cursors [光标处于的光标列表]
     * @return {Array<Cursor>}         [与 cursor 重合的光标]
     */
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
    /**
     * 在调用遍历类的方法进行删除操作时, 由于直接删除会导致数组下标对不上, 会报错.
     * 所以在遍历时, 需要将删除的光标推入队列, 然后在遍历结束后进行删除
     * @param  {Array}  list             [光标的删除队列]
     * @param  {Cursor} primaryCandidate [该光标在队列清空后作为主光标]
     * @return {Object}                  []
     */
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

    /**
     * 只允许设定光标的位置信息哦
     * @return {Object} [description]
     */
    useCreator() {
        const self = this
        const cursors = []

        const push = (cb, modName = 'Anchor') => {
            const cursor = self.usePhantom(modName)
            cursors.push(cursor)

            cb(cursor)
        }

        const create = () => {
            return cursors
        }

        return {
            push,
            create,
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

                if (coord.y === lastY) {
                    coord.x = coord.x + xAcc
                } else {
                    xAcc = 0
                }

                while(true) {
                    if (!isTerminate) {
                        nextOffsetCoord = offsetCoordGenerator()
                    }

                    if (!nextOffsetCoord) {
                        break
                    }

                    const { start, offsetCoord } = nextOffsetCoord

                    if (CoordHelper.less(coord, start, ArgOpt.ContainEqual)) {
                        lastY = start.y + (offsetCoord.y < 0 ? -offsetCoord.y : offsetCoord.y)

                        isTerminate = true

                        break
                    }

                    yAcc = yAcc + offsetCoord.y

                    const currentY = offsetCoord.y < 0 ? start.y : start.y - offsetCoord.y
                    if (currentY !== lastY) {
                        xAcc = 0
                    }

                    xAcc = xAcc + offsetCoord.x

                    lastY = currentY

                    isTerminate = false
                }

                offsetUpdater.setY(yAcc)
                offsetUpdater.setX(xAcc)

                cursor.updateOffset(offsetUpdater.flush(), lastY)
            },

            reset() {
                offsetMap.reset()
            },
        }
    }

    /* Extract */
    extract() {
        const cursors = []

        this.pureTraverse(cursor => {
            cursors.push(cursor.extract())
        })

        return {
            primary: this.cursors.indexOf(this.primary),
            cursors,
        }
    }

    rebuild(data) {
        const { primary, cursors } = data
        const creator = this.useCreator()

        for (let i = 0; i < cursors.length; i++) {
            creator.push(cursor => {
                cursor.rebuild(cursors[i])
            })
        }

        this.cursors = creator.create()
        this.setPrimary(this.cursors[primary])
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
}

module.exports = CursorMgr
