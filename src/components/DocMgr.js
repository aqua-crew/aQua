const { DocTree, Coord, Snippet, Content, Line  } = require('../models/index')

class DocMgr {
    constructor(aqua) {
        this.aqua = aqua
        this.doc = new DocTree
    }

    init() {
        const chunk = this.doc.newChunk(this.doc.root, 'line')

        this.doc.init(chunk)
    }

    size() {
        return this.doc.size()
    }

    /**
     * 往某个 coord 写入内容
     * @param  {Content} contents [description]
     * @param  {Coord}  coord    [description]
     * @return {[type]}          [description]
     */
    write(contents, coord = new Coord) {
        contents = this.aqua.contentMgr.split(contents)

        const lineInss = this.aqua.lineMgr.toLines(contents)
        const lineInssLen = lineInss.length

        const { chunk, index } = this.doc.getChunk(coord.logicalY)

        if (!chunk.children[index]) {
            this.doc.insert(lineInss, coord.logicalY)
        } else {
            /* 第一个元素为插入内容 */
            chunk.children[index].insertContent(lineInss[0].content, lineInss[lineInssLen - 1].content, coord.logicalX)
            lineInss.shift()

            /* 之后的为其生成新行 */
            if (lineInssLen !== 0) {
                this.doc.insert(lineInss, coord.logicalY)
            }
        }

        this.aqua.khala.emit('docUpdated', {
            type: 'write',
            start: coord,
            effect: lineInssLen,
        })

        return {
            y: lineInssLen - 1,
            x: contents[contents.length - 1].currentSize(),
        }
    }

    read(start, end) {
        const lineInss = this.doc.getLeaves(start.logicalY, end.logicalY)
    }

    // replace() {}

    // delete(start, end) {}

    // search(keywords) {
    //     return new Snippet
    // }
}

module.exports = DocMgr
