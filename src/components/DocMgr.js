const { Doc, Coord, Line, Chunk } = require('../models/index')
const { LineStatus, DocUpdateOptions } = require('../enums/index')

class DocMgr {
    constructor(aqua) {
        this.docWatcher = aqua.docWatcher

        this.doc = new Doc
    }

    init() {
        this.docWatcher.on('resize', lines => {
            if (!lines) {
                return
            }

            const effectChunks = []
            const heightsCollection = []

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
                }

                heightAcc = heightAcc + heightDiff
                lastParent = curParent
            }

            effectChunks.push(lastParent)
            heightsCollection.push(heightAcc)

            ACCPointer = 0
            heightAcc = 0
            let heightAccPointer = 0
            this.doc.bubble(
                effectChunks,

                (chunk) => {
                    const height = heightsCollection[ACCPointer]

                    chunk.height = chunk.height + height

                    heightAcc = heightAcc + height
                    ACCPointer = ACCPointer + 1
                },

                (parent) => {
                    heightsCollection[heightAccPointer] = heightAcc
                    heightAccPointer = heightAccPointer + 1
                },

                () => {
                    heightsCollection.length = heightAccPointer
                    ACCPointer = 0
                    heightAcc = 0
                    heightAccPointer = 0
                }
            )
        })
    }

    get size() {
        return this.doc.size
    }

    get height() {
        return this.doc.height
    }

    get pseudoFirstCoord() {
        return {
            y: 0,
            x: 0,
        }
    }

    get pseudoLastCoord() {
        return {
            y: this.size - 1,
            x: this.getLastLine().length,
        }
    }

    /* APIs */
    writeAsNewline(contents, coord = new Coord) {
        if (!Array.isArray(contents)) {
            contents = [contents]
        }

        contents.unshift('')

        this.write(contents, coord)
    }

    write(contents, coord = new Coord) {
        const startLineNum = coord.y

        if (!Array.isArray(contents)) {
            contents = [contents]
        }

        let effectLines = []

        if (this.doc.isLegal(startLineNum)) {
            const { chunk, offset } = this.doc.get(startLineNum)
            const line = chunk.get(offset)

            effectLines.push(line)

            if (contents.length > 1) {
                const lines = Line.toInstances(contents, 1)
                lines[lines.length - 1].write(line.delete(coord.x))
                this.doc.insert(startLineNum + 1, lines)

                effectLines = effectLines.concat(lines)
            }

            line.write(contents[0], coord.x)
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

    delete(start, end) {
        // this.correctCoord(start)
        // this.correctCoord(end)

        const startLineNum = start.y
        const endLineNum = end.y
        const distance = endLineNum - startLineNum

        let effectLines = []
        let effectCount = 0

        if (distance === 0) {
            const { chunk, offset } = this.doc.search(startLineNum)
            const line = chunk.get(offset)
            const deletedData = line.delete(start.x, end.x)

            effectLines = [line]
        }

        if (distance === 1) {
            const lines = this.doc.getLeaves(startLineNum, endLineNum + 1)
            const startLine = lines[0]
            const lastLine = lines[1]

            startLine.delete(start.x)
            startLine.write(lastLine.read(end.x))

            lastLine.release()
            this.doc.remove(endLineNum, 1)

            // effectLines = [startLine, lastLine]
            effectLines = [startLine]
            effectCount = 1
        }

        if (distance > 1) {
            const lines = this.doc.getLeaves(startLineNum, endLineNum + 1)
            const startLine = lines[0]
            const lastLine = lines[lines.length - 1]

            startLine.delete(start.x)
            startLine.write(lastLine.read(end.x))

            Line.setStatus(lines.slice(1), LineStatus.DELETED)
            this.doc.remove(startLineNum + 1, endLineNum - startLineNum)

            // effectLines = lines
            effectLines = [startLine]
            effectCount = lines.length - 1
        }

        this.docWatcher.emit('change', {
            effectLineNum: startLineNum,
            effectLines,
            source: 'delete',
        })
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
        const { chunk, offset, size } = this.doc.getByHeight(height, isContainBottomBorder)
        const line = chunk.get(offset)

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
        const yMax = this.doc.size

        const y = coord.y

        if (y < 0 || y >= yMax) {
            coord.y = yMax - 1
            coord.x = this.getLastLine().length

            return coord
        }

        const xMax = this.getLine(y).length
        const x = coord.x

        coord.x = x < 0 ? 0 : x > xMax ? xMax : x

        return coord
    }

    // getText(start = null, end = null) {
    //     if (start === null) {
    //         start = 0
    //         end = Infinity
    //     }

    //     if (end === null) {
    //         end = start + 1
    //     }

    //     let str = ''

    //     const lines = this.doc.getLeaves(start, end)

    //     for (let i = 0; i < lines.length; i++) {
    //         const line = lines[i]
    //         str = str + line.toString()
    //     }

    //     return str
    // }
}

module.exports = DocMgr
