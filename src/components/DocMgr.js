const { Doc, Coord, Line, Chunk } = require('../models/index')
const { LineStatus, DocUpdateOptions } = require('../enums/index')
const { CoordHelper } = require('../helpers/index')

class DocMgr {
    constructor(aqua) {
        this.khala = aqua.khala
        this.docWatcher = aqua.docWatcher
        this.chronicle = aqua.chronicle
        this.cursorMgr = aqua.cursorMgr

        this.doc = new Doc
    }

    get size() {
        return this.doc.size
    }

    get height() {
        return this.doc.height
    }

    get pseudoStartCoord() {
        return {
            y: 0,
            x: 0,
        }
    }

    get pseudoEndCoord() {
        return {
            y: this.size - 1,
            x: this.getLastLine().length,
        }
    }

    init() {
        this.docWatcher.on('resize', lines => {
            this.resize(lines)
        })

        this.wrap()
        this.writePrototype('')
    }

    /**
     * 为 writePrototype 和 deletePrototype 添加更多特殊效果
     * @return {Undefined}
     */
    wrap() {
        /**
         * 1. 将 writePrototype 作为 microEvent, 此时将计入 Undo & Redo
         * @param  {Boolean} options.isInsert [是否将 contengs 插入到下一行开头]
         * @param  {Boolean} options.track    [是否将该次写入计入 Undo & Redo]
         */
        this.write = (contents, cursor = null, {
            isInsert = false,
            track = true,
        } = {}) => {
            if (!Array.isArray(contents)) {
                contents = [contents]
            }

            const coord = (cursor && cursor.coord) || cursor || this.cursorMgr.getPrimary().coord

            this.correctCoord(coord)

            const result = this.writePrototype(contents, coord, isInsert)

            if (track) {
                const start = (coord.extract && coord.extract()) || coord

                if (isInsert) {
                    start.x = this.getLine(start.y).length
                    contents.unshift('')
                }

                const end = {
                    y: coord.y + result.y,
                    x: result.y > 0 ? result.x : coord.x + result.x
                }

                this.khala.emit('microEvent', {
                    source: 'write',
                    contents,
                    start,
                    end,
                })
            }

            return result
        }

        /**
         * 1. 将 deletePrototype 作为 microEvent, 此时将计入 Undo & Redo
         * @param  {Boolean} options.track    [是否将该次删除计入 Undo & Redo]
         */
        this.delete = (start, end, {
            track = true,
        } = {}) => {
            this.correctCoord(start)
            this.correctCoord(end)

            if (CoordHelper.greater(start, end)) {
                [start, end] = [end, start]
            }

            const result = this.deletePrototype(start, end)

            if (result.length === 0) {
                return result
            }

            if (track) {
                start = (start.extract && start.extract()) || start
                end = (end.extract && end.extract()) || end

                this.khala.emit('microEvent', {
                    source: 'delete',
                    contents: result,
                    start,
                    end,
                })
            }

            return result
        }
    }

    resize(lines, force = false) {
        if (!lines) {
            return
        }

        const effectChunks = []
        let heightsCollection = []

        let lastParent = lines[0].parent
        let heightAcc = 0

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            const heightDiff = line.flushHeightBuffer()
            const curParent = line.parent

            if (curParent !== lastParent) {
                effectChunks.push(lastParent)
                heightsCollection.push(heightAcc)

                heightAcc = 0

                lastParent = curParent
            }

            heightAcc = heightAcc + heightDiff
        }

        effectChunks.push(lastParent)
        heightsCollection.push(heightAcc)

        heightAcc = 0
        let ACCPointer = 0
        let heights = []

        this.doc.bubble(
            effectChunks,

            (chunk) => {
                const height = heightsCollection[ACCPointer]

                chunk.height = chunk.height + height

                heightAcc = heightAcc + height
                ACCPointer = ACCPointer + 1
            },

            () => {
                heights.push(heightAcc)
                heightAcc = 0
            },

            () => {
                heightsCollection = heights
                heights = []
                ACCPointer = 0
                heightAcc = 0
            }
        )
    }

    /* APIs */
    writePrototype(contents, coord = new Coord, isInsert = false) {
        if (!Array.isArray(contents)) {
            contents = [contents]
        }

        const startLineNum = coord.y

        let effectLines = []

        if (this.doc.isLegal(startLineNum)) {
            const { chunk, offset } = this.doc.get(startLineNum)
            const line = chunk.get(offset)

            if (isInsert) {
                const lines = Line.toInstances(contents)
                this.doc.insert(startLineNum + 1, lines)

                effectLines = lines
            } else {
                effectLines.push(line)

                if (contents.length > 1) {
                    const lines = Line.toInstances(contents, 1)
                    lines[lines.length - 1].write(line.delete(coord.x))

                    this.doc.insert(startLineNum + 1, lines)

                    effectLines = effectLines.concat(lines)
                }

                line.write(contents[0], coord.x)
            }
        } else {
            const lines = Line.toInstances(contents)
            this.doc.insert(startLineNum, lines)

            effectLines = lines
        }

        this.docWatcher.emit('change', {
            effectLineNum: startLineNum,
            effectLines,
            source: 'write',
        })

        const effectY = contents.length - 1

        return {
            y: isInsert ? effectY + 1 : effectY,
            x: contents[effectY].length,
        }
    }

    deletePrototype(start, end) {
        let deleteAsset = []

        if (start.y === end.y && start.x === end.x) {
            return deleteAsset
        }

        const startLineNum = start.y
        const endLineNum = end.y
        const distance = endLineNum - startLineNum

        let effectLines = []
        let effectCount = 0

        if (distance === 0) {
            const { chunk, offset } = this.doc.search(startLineNum)
            const line = chunk.get(offset)
            deleteAsset.push(line.delete(start.x, end.x))

            effectLines = [line]
        }

        if (distance === 1) {
            const lines = this.doc.getLeaves(startLineNum, endLineNum + 1)
            const startLine = lines[0]
            const lastLine = lines[1]

            deleteAsset.push(startLine.delete(start.x))
            deleteAsset.push(lastLine.read(0, end.x))

            startLine.write(lastLine.read(end.x))

            lastLine.release() // 用于其他地方的 diff 比较

            this.doc.remove(endLineNum, 1)

            effectLines = [startLine]
            effectCount = 1
        }

        if (distance > 1) {
            const lines = this.doc.getLeaves(startLineNum, endLineNum + 1)
            const startLine = lines[0]
            const lastLine = lines[lines.length - 1]

            deleteAsset.push(startLine.delete(start.x))
            startLine.write(lastLine.read(end.x))

            Line.setStatus(lines.slice(1), LineStatus.DELETED)
            const removeLines = this.doc.remove(startLineNum + 1, endLineNum - startLineNum)

            for (let i = 0; i < removeLines.length - 1; i++) {
                deleteAsset.push(removeLines[i].data)
            }

            deleteAsset.push(removeLines[removeLines.length - 1].read(0, end.x))

            effectLines = [startLine]
            effectCount = lines.length - 1
        }

        this.docWatcher.emit('change', {
            effectLineNum: startLineNum,
            effectLines,
            source: 'delete',
        })

        return deleteAsset
    }

    /**
     * @param  {Coord} start [description]
     * @param  {Coord} end   [description]
     * @return {Array<Assets>}       [description]
     */
    read(start, end) {
        const startLineNum = start.y
        const endLineNum = end.y
        const distance = end.y - start.y

        if (distance === 0) {
            const { chunk, offset } = this.doc.get(startLineNum)
            const line = chunk.get(offset)

            return [line.read(start.x, end.x)]
        }

        const lines = this.doc.getLeaves(startLineNum, endLineNum + 1)

        const firstLineContent = lines[0].read(start.x)
        const endLineContent = lines[1].read(0, end.x)

        if (distance === 1) {
            return [firstLineContent, endLineContent]
        }

        const result = []

        result.push(firstLineContent)

        for (let i = 1; i < lines.length - 1; i++) {
            result.push(lines[i].read())
        }

        result.push(endLineContent)

        return result
    }

    getLine(lineNum, returnHeight = false) {
        if (returnHeight) {
            return this.getLineWithHeight(lineNum)
        }

        const { chunk, offset } = this.doc.get(lineNum)

        return chunk.get(offset)
    }

    getLineWithHeight(lineNum) {
        const { chunk, offset, height } = this.doc.get(lineNum, true)
        const line = chunk.get(offset)
        line.top = height

        return line
    }

    getLineByHeight(height, isContainBottomBorder = false) {
        const { chunk, offset, size, height: top } = this.doc.getByHeight(height, isContainBottomBorder)
        const line = chunk.get(offset)

        line.top = height - top
        line.staticLineNum = size

        return line
    }

    getFirstLine(returnHeight = false) {
        return returnHeight ? this.getLineWithHeight(0) : this.getLine(0)
    }

    getLastLine(returnHeight = false) {
        return returnHeight ? this.getLineWithHeight(Infinity) : this.getLine(Infinity)
    }

    getLines(start, end = start + 1) {
        return this.doc.getLeaves(start, end)
    }

    correctLineNum(lineNum) {
        return this.doc.correct(lineNum, true)
    }

    correctLineNumAsIndex(lineNum) {
        return this.doc.correct(lineNum)
    }

    correctCoord(coord) {
        const yMax = this.size

        const y = coord.y

        if (y < 0) {
            coord.y = 0
            coord.x = 0

            return coord
        } else if (y >= yMax) {
            coord.y = yMax - 1
            coord.x = this.getLastLine().length

            return coord
        }

        const xMax = this.getLine(y).length
        const x = coord.x

        coord.x = x < 0 ? 0 : x > xMax ? xMax : x

        return coord
    }
}

module.exports = DocMgr
