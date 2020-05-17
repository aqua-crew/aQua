const { Range } = require('../utils/index')

const LINE_HEIGHT = 25
const FONT_SIZE = 12

class ExtendedLine {
    constructor($line, korwa) {
        this.$code = $line.children[1].firstChild
        this.korwa = korwa

        this.updateMap()
    }

    updateMap() {
        this.map = this.genMap()
    }

    /**
     * 得到指定元素(x, x + 1)的 rect
     * @param  {Number} x [指定位置]
     * @return {Rect || null}   [description]
     */
    getElementRect(x) {
        const map = this.map

        for (let i = map.length - 1; i >= 0; i -= 2) {
            if (x < map[i]) {
                continue
            }

            const insideX = x - map[i]
            const ele = map[i + 1]
            const eleType = ele.tagName

            return eleType ? ele.getBoundingClientRect() : Range.create(ele, insideX, insideX + 1).getBoundingClientRect()
        }

        return null
    }

    getCurrentBlock(x) {
        const map = this.map
        const end = map.length - 1

        let leftBorder = 0
        let rightBorder = map[end]

        for (let i = end; i >= 0; i -= 2) {
            const logicalX = map[i]

            if (x < logicalX) {
                continue
            }

            if (x === logicalX) {
                leftBorder = map[i - 2] || leftBorder
                rightBorder = map[i + 2] || rightBorder

                break
            }

            leftBorder = logicalX
            rightBorder = map[i + 2]

            break
        }

        return {
            leftBorder,
            rightBorder,
        }
    }

    getInsideY(y) {
        const lineRects = this.getClientRects()
        let insideY = lineRects.length - 1

        for (; insideY >= 0; insideY--) {
            const bottom = this.transformToRealBottom(lineRects[insideY].bottom) - this.korwa.getScrollerRect().top // (lineHeight - fontSize) / 2

            if (y > bottom) {
                break
            }
        }

        return insideY + 1
    }

    transformToLayoutY(insideY) {
        const rects = this.getClientRects()
        return rects[insideY].bottom - this.korwa.getScrollerRect().top
    }

    getClientRects() {
        return this.$code.getClientRects()
    }

    getLength() {
        return this.map[this.map.length - 1]
    }

    genMap() {
        const $nodes = this.$code.childNodes // 由于空格之类的字符不生成包裹的父元素, 如果使用 children 那么这些空格由于不算作 ElementType, 会被忽略 导致报错
        // const $nodes = this.$code.children
        const len = $nodes.length
        const map = [0]

        for (let i = 0; i < len; i++) {
            const $node = $nodes[i]
            const pointer = i * 2
            const $element = $node.firstChild || $node // $element can be text node or img node

            map[pointer + 1] = $element
            map[pointer + 2] = ($element.length || 1) + map[pointer]
        }

        return map
    }

    transformToRealBottom(y) {
        return y + (LINE_HEIGHT - FONT_SIZE) / 2
    }
}

module.exports = ExtendedLine
