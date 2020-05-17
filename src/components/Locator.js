const CURSOR_HEIGHT = 22
const LINE_HEIGHT = 24
const FONT_SIZE = 12

const { Algorithm } = require('../utils/index')

class Locator {
    constructor(aqua) {
        this.aqua = aqua

        this.lineMgr = aqua.lineMgr
        this.doc = aqua.docMgr
        this.korwa = aqua.korwa
    }

    getCoordByLayout($y, $x) {
        let $rawY = $y
        let $rawX = $x
        const doc = this.doc

        const maxHeight = doc.height

        if ($rawY > maxHeight) {
            $rawY = maxHeight
            $rawX = Infinity
        } else if ($rawY < 0) {
            $rawY = 0
            $rawX = 0
        }

        const line = doc.getLineByHeight($rawY)
        const lineNum = line.staticLineNum
        const extendedLine = this.lineMgr.extendLine(lineNum)
        const lineRects = extendedLine.getClientRects()
        const insideY = extendedLine.getInsideY($rawY)
        const rect = lineRects[insideY]
        const measureRect = this.korwa.getLineWidthRect()
        const $xMax = rect.right - measureRect.left
        const $xMin = rect.left - measureRect.left

        if ($rawX > $xMax) {
            $rawX = $xMax
        } else if ($rawX < $xMin) {
            $rawX = $xMin
        }

        let x = -1

        Algorithm.binarySearch(0, line.length, center => {
            const charRect = extendedLine.getElementRect(center)
            const top = charRect.bottom - measureRect.top
            const charRectInsideY = extendedLine.getInsideY(top)

            if (insideY > charRectInsideY) {
                return 1
            }

            if (insideY < charRectInsideY) {
                return -1
            }

            const left = charRect.left - measureRect.left
            if ($rawX < left) {
                return -1
            }

            const right = charRect.right - measureRect.left
            if ($rawX > right) {
                return 1
            }

            const half = charRect.width / 2
            if ($rawX - left < half) {
                x = center
                $x = left
            } else {
                x = center + 1
                $x = right
            }

            return 0
        })

        return {
            logicalY: lineNum,
            logicalX: x,
            physicalY: this.transformToCursorPhysicalY(extendedLine.transformToLayoutY(insideY)),
            physicalX: $x,
            insideY,
            maxInsideY: lineRects.length - 1,
        }
    }

    getCoordByCoord(y, x) {
        const doc = this.doc
        const yMax = doc.size

        if (y < 0) {
            y = 0
        } else if (y > yMax) {
            y = yMax - 1
        }

        const line = this.doc.getLine(y)
        const extendedLine = this.lineMgr.extendLine(y)
        const xMax = line.length

        if (xMax === 0) {
            return {
                logicalY: y,
                logicalX: 0,
                physicalY: this.transformToCursorPhysicalY(extendedLine.transformToLayoutY(0)),
                physicalX: 0,
                insideY: 0,
                maxInsideY: 0,
            }
        }

        if (x < 0) {
            x = 0
        } else if (x > xMax) {
            x = xMax
        }

        const measureRect = this.korwa.getLineWidthRect()
        const xAtLast = x === xMax // 如果是最后一格, 取 charRect 按照最后一个字取, 只不过在返回的时候返回 rect 的右边部分
        const charRect = extendedLine.getElementRect(xAtLast ? x - 1 : x)
        const insideY = extendedLine.getInsideY(charRect.bottom - measureRect.top)
        const lineRects = extendedLine.getClientRects()

        return {
            logicalY: y,
            logicalX: x,
            physicalY: this.transformToCursorPhysicalY(extendedLine.transformToLayoutY(insideY)),
            physicalX: xAtLast ? charRect.right - measureRect.left : charRect.left - measureRect.left,
            insideY,
            maxInsideY: lineRects.length - 1,
        }
    }

    transformToCursorPhysicalY(y) {
        return y - CURSOR_HEIGHT + (LINE_HEIGHT - FONT_SIZE) / 4
    }
}

module.exports = Locator
