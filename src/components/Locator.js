const CURSOR_HEIGHT = 22
const LINE_HEIGHT = 24
const FONT_SIZE = 12

class Locator {
    constructor(aqua) {
        this.aqua = aqua
    }

    /**
     * [getCoordByPhysical description]
     * @param  {Number} x physicalX
     * @param  {Number} y physicalY
     * @return {Coord}
     */
    getCoordByPhysical(y, x) {
        const doc = this.aqua.docMgr.doc

        if (y < 0) {
            y = 0
            x = 0
        }

        if (y > doc.height) {
            y = doc.height
            x = Infinity
        }

        const lineNum = this.aqua.contentMgr.getLineIns(y, 'physical').lineNum
        const box = this.aqua.uiMgr.get('lineCntr').getBoundingClientRect()
        const measuredLine = this.aqua.lineMgr.getMeasuredLine(lineNum)
        const lineRects = measuredLine.getClientRects()
        const insideY = measuredLine.getInsideLogicalY(y)
        let fixedX = x
        let fixedY = this.transformToCursorPhysicalY(measuredLine.getInsidePhysicalY(insideY))
        const rect = lineRects[insideY]

        if (x > rect.right - box.left) {
            x = rect.right - box.left
        }

        if (x < rect.left - box.left) {
            x = 0
        }

        binarySearch(0, measuredLine.getLength(), (center) => {
            const charRect = measuredLine.getElementRect(center)

            const top = charRect.bottom - box.top
            const charRectInsideY = measuredLine.getInsideLogicalY(top)

            if (insideY > charRectInsideY) {
                return 1
            }

            if (insideY < charRectInsideY) {
                return -1
            }

            const left = charRect.left - box.left
            if (x < left) {
                return -1
            }

            const right = charRect.right - box.left
            if (x > right) {
                return 1
            }

            const half = charRect.width / 2
            if (x - left < half) {
                x = center
                fixedX = left
            } else {
                x = center + 1
                fixedX = right
            }

            return 0
        })

        return {
            physicalY: fixedY,
            physicalX: fixedX,
            logicalX: x,
            logicalY: lineNum,
            insideY,
            maxInsideY: lineRects.length - 1,
        }

        function binarySearch(start, end, checkFn) {
            const center = parseInt((start + end) / 2)
            const result = checkFn(center)

            return result < 0 ? binarySearch(start, center, checkFn) :
                result > 0 ? binarySearch(center, end, checkFn) : center
        }
    }

    /**
     * [getCoordByLogical description]
     * @param  {Number} x logicalX
     * @param  {Number} y logicalY
     * @return {Coord}
     */
    getCoordByLogical(y, x) {
        const doc = this.aqua.docMgr.doc

        if (y < 0) {
            y = 0
        }

        if (y > doc.size) {
            y = doc.size - 1
        }

        if (x < 0) {
            x = 0
        }

        const measuredLine = this.aqua.lineMgr.getMeasuredLine(y)
        const len = measuredLine.getLength()
        let isLast = false
        if (x >= len) {
            x = len - 1
            isLast = true
        }

        const charRect = measuredLine.getElementRect(x)
        const box = this.aqua.uiMgr.get('lineCntr').getBoundingClientRect()
        const insideY = measuredLine.getInsideLogicalY(charRect.bottom - box.top)
        const lineRects = measuredLine.getClientRects()

        return {
            physicalY: this.transformToCursorPhysicalY(measuredLine.getInsidePhysicalY(insideY)),
            physicalX: isLast ? charRect.right - box.left : charRect.left - box.left,
            logicalX: isLast ? x + 1 : x, // 如果是最后一行, 那么x应该为那行的字符长度, 但是由于 measuredLine.getElementRect 不允许这样的位置, 所以之前会 -1, 这里需要 +1
            logicalY: y,
            insideY,
            maxInsideY: lineRects.length - 1,
        }
    }

    transformToCursorPhysicalY(y) {
        return y - CURSOR_HEIGHT + (LINE_HEIGHT - FONT_SIZE) / 4
    }
}

module.exports = Locator
