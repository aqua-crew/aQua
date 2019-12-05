const Chunk = require('./Chunk')

class DocTree {
    constructor({
        root = new Chunk,
        lineMax = 50,
        chunkMax = 6,
    } = {}) {
        this.root = root
        this.lineMax = lineMax
        this.chunkMax = chunkMax
    }

    size(chunk = this.root) {
        return chunk.size
    }

    newChunk(parent = null, type = 'chunk') {
        const chunk = new Chunk({
            type,
            parent,

            onCreated: function(parent) {
                this.parent = parent

                if (type === 'chunk') {
                   this.size = 0
                }

                this.height = 0
            },

            onIncreased: function(chunks) {
                console.error('chunks', chunks)
                let height = 0
                let size = 0

                for (let i = 0; i < chunks.length; i++) {
                    const chunk = chunks[i]

                    chunk.parent = this
                    height = height + chunk.height
                    size = size + (chunk.size || 1)
                }

                this.bubble(chunk => {
                    if (chunk.type === 'chunk') {
                        chunk.size = chunk.size + size
                    }

                    chunk.height = chunk.height + height
                })
            },

            onDecreased(chunks) {
                let height = 0
                let size = 0

                for (let i = 0; i < chunks.length; i++) {
                    const chunk = chunks[i]
                    const chunkSize = typeof chunk.size !== 'number' ? 0 : chunk.size

                    height = height - chunk.height
                    size = size - chunkSize
                }

                this.bubble(chunk => {
                    if (chunk.type === 'chunk') {
                        chunk.size = chunk.size - size
                    }

                    chunk.height = chunk.height - height
                })
            },
        })

        return chunk
    }

    split(chunk) {
        const newChunk = this.newChunk(chunk.parent, chunk.type)
    }

    /**
     * 插入叶子节点
     * @param  {Array<Object> | Object} leaf
     * @param  {Coord}  y    [description]
     * @return {[type]}          [description]
     */
    insert(nodes, y) {
        if (!Array.isArray(nodes)) {
            nodes = [nodes]
        }

        const { chunk, index } = this.getChunk(y)

        chunk.splice(index + 1, 0, nodes)

        return nodes.length
    }

    /**
     * 删除叶子节点
     * @param  {[type]} y     [description]
     * @param  {Number} count [description]
     * @return {[type]}       [description]
     */
    remove(y, count = 1) {
        const { chunk, index } = this.getChunk(y)
        const effect = chunk.children.splice(index, count)

        return effect.length
    }

    getChunk(y = Infinity) {
        y = this.correctY(y)

        return this.searchChunk(y, doc)
    }

    getLeaves(start, end = Infinity) {
        end = this.correctY(end)

        const leaves = []
        end = this.correctY(end)

        const distance = end - start + 1
        const startChunk = this.getChunk(start)
        const endChunk = this.getChunk(end)

        console.error('distance', distance)
    }

    searchChunk(index, chunk) {
        const children = chunk.children

        if (chunk.type === 'line') {
            return { chunk, index }
        }

        for (let i = 0; i < children.length; i++) {
            const childChunk = children[i]
            const size = childChunk.size

            if (index > size) {
                index = index - size

                continue
            }

            return this.searchChunk(index, childChunk)
        }
    }

    correctY(y) {
        const doc = this.root
        const size = doc.size

        if (y > size - 1) {
            y = size - 1
        }

        if (y < 0) {
            y = 0
        }

        return y
    }

    /* Once */
    init(chunks) {
        if (!Array.isArray(chunks)) {
            chunks = [chunks]
        }

        for (let i = 0; i < chunks.length; i++) {
            this.root.children.push(chunks[i])
        }
    }
}

module.exports = DocTree
