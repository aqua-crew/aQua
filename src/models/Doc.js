const Chunk = require('./Chunk')

const NO_BUBBLE = 1
const NO_EFFECT = 2

class Doc {
    constructor({
        root = new Chunk,
    } = {}) {
        this.root = root
    }

    get size() {
        return this.root.size
    }

    get height() {
        return this.root.height
    }

    setRoot(root, levelup = 1) {
        root.level = root.level + levelup

        this.root = root
    }

    isLeaf(chunk, base = 1) {
        return chunk.level < base
    }

    isRoot(chunk) {
        return chunk === this.root
    }

    isLegal(index) {
        return index >= 0 && index < this.root.size
    }

    getOffset(chunk) {
        return chunk.parent !== null ? chunk.parent.children.indexOf(chunk) : -1
    }

    correct(index, contain = false, type = 'size') {
        if (index < 0) {
            return 0
        }

        const max = this.root[type]

        if (index > max) {
            return contain ? max - 1 : max
        }

        if (index === max) {
            return contain ? max - 1 : max
        }

        return index
    }

    getByHeight(height, isContainBottomBorder = false, chunk = this.root) {
        return this._searchByHeight(this.correct(height, false, 'height'), 0, isContainBottomBorder, chunk)
    }

    _searchByHeight(height, size, isContainBottomBorder = false, chunk) {
        const children = chunk.children

        if (chunk.level < 1) {
            let i = 0
            let child = null
            for (; i < children.length; i++) {
                child = children[i]

                if (height > child.height) {
                   height = height - child.height
                   size = size + 1

                   continue
                }

                if (height === child.height && !isContainBottomBorder) {
                   height = height - child.height
                   size = size + 1

                   continue
                }

                return { chunk, offset: i, size, height }
            }

            return { chunk, offset: i - 1, size: size - 1, height: child.height }
        } else {
            for (let i = 0; i < children.length; i++) {
                const child = children[i]

                if (height > child.height) {
                   height = height - child.height
                   size = size + child.size

                   continue
                }

                return this._searchByHeight(height, size, isContainBottomBorder, child)
            }
        }
    }

    get(index, returnHeight = false, chunk = this.root) {
        return returnHeight ? this._searchWithHeight(this.correct(index, true), chunk, true, 0) : this._search(this.correct(index, true), chunk, true)
    }

    search(index, chunk = this.root) {
        return this._search(this.correct(index), chunk)
    }

    /* Private */
    _search(index, chunk, contain) {
        if (chunk.level < 1) {
            return { chunk, offset: index }
        }

        const children = chunk.children

        for (let i = 0; i < children.length; i++) {
            const child = children[i]
            const size = child.size

            if (index > (contain ? size - 1 : size)) {
                index = index - size

                continue
            }

            return this._search(index, child, contain)
        }
    }

    _searchWithHeight(index, chunk, contain, height) {
        if (chunk.level < 1) {
            const children = chunk.children

            for (let i = 0; i < index; i++) {
                height = height + children[i].height
            }

            return { chunk, offset: index, height}
        }

        const children = chunk.children

        for (let i = 0; i < children.length; i++) {
            const child = children[i]
            const size = child.size

            if (index > (contain ? size - 1 : size)) {
                index = index - size
                height = height + child.height

                continue
            }

            return this._searchWithHeight(index, child, contain, height)
        }
    }

    bubble(objs, cb, breakCb, after) {
        if (objs.length === 1 && this.isRoot(objs[0])) {
            return cb(objs[0])
        }

        const effectObjs = []

        const firstObj = objs[0]

        let lastParent = firstObj.parent
        cb(firstObj, lastParent)

        for (let i = 1; i < objs.length; i++) {
            const obj = objs[i]
            const parent = obj.parent

            if (lastParent !== parent) {
                breakCb(lastParent)
                effectObjs.push(lastParent)
            }

            cb(obj)

            lastParent = parent
        }

        breakCb(lastParent)
        effectObjs.push(lastParent)

        after(effectObjs)

        return this.bubble(effectObjs, cb, breakCb, after)
    }

    getLeaves(start = 0, end = this.root.size, chunk = this.root, objs = []) {
        start = this.correct(start)
        end = this.correct(end)

        return this._tryGetLeaves({
            start,
            count: end - start,
            objs,
        }, chunk,
        (chunk, pak) => {
            const harvest = chunk.children.slice(pak.start, pak.start + pak.count)

            pak.objs = pak.objs.concat(harvest)
            pak.start = 0
            pak.count = pak.count - harvest.length
        }).objs
    }

    getZeroLevelChunks(start = 0, end = this.root.size, chunk = this.root, chunks = []) {
        return this._tryGetLeaves({
            start,
            count: end - start,
            chunks,
        }, chunk,
        (chunk, pak) => {
            let end = -1
            let isEntire = false

            const expectSize = pak.start + pak.count
            const limitSize = chunk.size

            if (expectSize < limitSize) {
                end = expectSize
            } else {
                end = limitSize
                isEntire = pak.start === 0
            }

            pak.chunks.push({
                chunk,
                isEntire,
                start: pak.start,
                end,
            })

            pak.count = pak.count - (end - pak.start)
            pak.start = 0
        }).chunks
    }

    /* Private */
    _tryGetLeaves(pak, chunk, cb) {
        if (pak.count < 1) {
            return pak
        }

        if (this.isLeaf(chunk)) {
            cb(chunk, pak)

            return pak
        }

        const children = chunk.children

        for (let i = 0; i < children.length; i++) {
            const child = children[i]
            const size = child.size

            if (pak.start >= size) {
                pak.start = pak.start - size
                continue
            }

            this._tryGetLeaves(pak, children[i], cb)

            if (pak.count < 1) {
                return pak
            }
        }

        return pak
    }

    insert(index, objs, payload) {
        if (objs.length === 0) {
            return 0
        }

        const { chunk, offset } = typeof index === 'number' ? this.search(index) : index
        chunk.splice(offset, 0, objs)

        this.onInsert && this.onInsert(chunk, objs, payload)

        const volume = chunk.level > 0 ? chunk.chunkVolume : chunk.volume
        if (chunk.length > volume) {
            this.onOverflow && this.onOverflow(chunk)
        }
    }

    /**
     * 注意跨 chunk 删除
     */
    remove(index, deleteCount = 1, payload) {
        let objs = []

        if (typeof index === 'number') {
            const effectChunks = []
            const effectObjs = []
            const releaseChunks = []

            const chunks = this.getZeroLevelChunks(index, index + deleteCount)

            for (let i = 0; i < chunks.length; i++) {
                const { chunk, start, end, isEntire } = chunks[i]

                if (isEntire) {
                    releaseChunks.push(chunk)
                    objs = objs.concat(chunk.children)
                } else {
                    const effectObj = chunk.splice(start, end - start)

                    effectChunks.push(chunk)
                    effectObjs.push(effectObj)

                    objs = objs.concat(effectObj)
                }
            }

            for (let i = 0; i < effectChunks.length; i++) {
                this.onRemove && this.onRemove(effectChunks[i], effectObjs[i], payload)
            }

            releaseChunks.length > 0 && this.onRelease && this.onRelease(releaseChunks)
        } else {
            const { chunk, offset } = index

            objs = chunk.splice(offset, deleteCount)

            this.onRemove && this.onRemove(chunk, objs, payload)

            chunk.size === 0 && this.onRelease && this.onRelease(chunk)
        }

        return objs
    }

    toChunks(chunk, objs, copys = []) {
        const volume = parseInt((chunk.level > 0 ? chunk.chunkVolume : chunk.volume))
        const count = Math.ceil(objs.length / volume)

        let floor = 0

        for (let i = 0; i < count; i++) {
            const copy = chunk.clone({
                parent: null,
            })

            this.insert({
                chunk: copy,
                offset: 0,
            }, objs.slice(floor, floor = floor + volume))

            copys.push(copy)
        }

        return copys
    }

    /* Rare */

    onInsert(chunk, objs, payload) {
        let effectSize = 0
        let effectHeight = 0

        if (this.isLeaf(chunk)) {
            effectSize = effectSize + objs.length

            for (let i = 0; i < objs.length; i++) {
                const newcomer = objs[i]
                effectHeight = effectHeight + newcomer.height

                newcomer.parent = chunk
            }
        } else {
            for (let i = 0; i < objs.length; i++) {
                const newcomer = objs[i]
                effectSize = effectSize + newcomer.size
                effectHeight = effectHeight + newcomer.height

                newcomer.parent = chunk
            }
        }

        if (payload === NO_EFFECT) {
            return
        }

        if (payload === NO_BUBBLE) {
            chunk.size = chunk.size + effectSize
            chunk.height = chunk.height + effectHeight

            return
        }

        chunk.bubble(chunk => {
            chunk.size = chunk.size + effectSize
            chunk.height = chunk.height + effectHeight
        })
    }

    onRemove(chunk, objs, payload) {
        if (payload === NO_EFFECT) {
            return
        }

        let effectSize = 0
        let effectHeight = 0

        if (this.isLeaf(chunk)) {
            effectSize = effectSize + objs.length

            for (let i = 0; i < objs.length; i++) {
                const existed = objs[i]

                effectHeight = effectHeight + existed.height
            }
        } else {
            for (let i = 0; i < objs.length; i++) {
                const existed = objs[i]

                effectSize = effectSize + existed.size
                effectHeight = effectHeight + existed.height
            }
        }

        if (payload === NO_BUBBLE) {
            chunk.size = chunk.size - effectSize
            chunk.height = chunk.height - effectHeight

            return
        }

        chunk.bubble(chunk => {
            chunk.size = chunk.size - effectSize
            chunk.height = chunk.height - effectHeight
        })
    }

    onOverflow(chunk, force = false) {
        const volume = chunk.level > 0 ? chunk.chunkVolume : chunk.volume
        const halfVolume = parseInt(volume / 2)

        const splitChildren = this.remove({
            chunk,
            offset: halfVolume,
        }, chunk.children.length - halfVolume, NO_BUBBLE)

        const copys = this.toChunks(chunk, splitChildren)

        if (this.isRoot(chunk)) {
            const newRoot = chunk.clone()

            this.setRoot(newRoot)

            this.insert({
                chunk: newRoot,
                offset: 0,
            }, [chunk].concat(copys))
        } else {
            this.insert({
                chunk: chunk.parent,
                offset: this.getOffset(chunk) + 1,
            }, copys, NO_EFFECT)
        }
    }

    onRelease(chunk) {
        console.error('onRelease', chunk)
        if (Array.isArray(chunk) ) {
            const chunks = chunk

            if (chunks.length > 1) {
                const firstChunk = chunks[0]

                let chunkParent = firstChunk.parent
                let offset = this.getOffset(firstChunk)
                let count = 1

                for (let i = 1; i < chunks.length; i++) {
                    const chunk = chunks[i]
                    const parent = chunk.parent

                    if (parent !== chunkParent) {
                        this.remove({
                            chunk: chunkParent,
                            offset,
                        }, count)

                        chunkParent = parent
                        offset = this.getOffset(chunk)
                        count = 1
                    } else {
                        count = count + 1
                    }
                }

                this.remove({
                    chunk: chunkParent,
                    offset,
                }, count)

                return
            }

            chunk = chunks[0]
        }

        if (this.isRoot(chunk)) {
            console.error('Try to remove root')
            chunk.level = 0

            return
        }

        this.remove({
            chunk: chunk.parent,
            offset: this.getOffset(chunk),
        }, 1)
    }
}

module.exports = Doc
