const CURSOR_HEIGHT = 22
const LINE_HEIGHT = 24
const FONT_SIZE = 12

const { Algorithm } = require('../utils/index')

class Locator {
    constructor(aqua) {
        this.lineMgr = aqua.lineMgr
        this.doc = aqua.docMgr
        this.korwa = aqua.korwa
        this.scroller = aqua.scroller
    }

    // ?
    getLayoutYAtLine(y, insideY = 0) {
        const extendedLine = this.lineMgr.extendLine(y)
        const lineRects = extendedLine.getClientRects()
        const maxInsideY = lineRects.length - 1

        if (insideY < 0) {
            insideY = 0
        } else if (insideY > maxInsideY) {
            insideY = maxInsideY
        }

        const rect = lineRects[insideY]
        const measureRect = this.korwa.getScrollerRect()

        return (rect.bottom - rect.top) / 2 - this.scroller.y
    }



    getYByLayoutY($y) {
        const maxHeight = this.doc.height

        if ($y > maxHeight) {
            $y = maxHeight
            $x = Infinity
        } else if ($y < 0) {
            $y = 0
            $x = 0
        }

        const line = this.doc.getLineByHeight($y)
        const y = line.staticLineNum
        const extendedLine = this.lineMgr.extendLine(y)

        const insideY = extendedLine.getInsideY($y - line.top)
        const lineRects = extendedLine.getClientRects()

        return {
            y,
            insideY,
            maxInsideY: lineRects.length - 1,
        }
    }

    getXByLayoutX(y, insideY, $x) {
        const extendedLine = this.lineMgr.extendLine(y)
        const lineRects = extendedLine.getClientRects()
        const maxInsideY = lineRects.length - 1

        if (insideY < 0) {
            insideY = 0
        } else if (insideY > maxInsideY) {
            insideY = maxInsideY
        }

        const rect = lineRects[insideY]
        const measureRect = this.korwa.getLineWidthRect()
        const $xMax = rect.right - measureRect.left
        const $xMin = rect.left - measureRect.left

        let x = -1

        // lineRects[insideY].rect.right 并不一定等于 lastCharRect.right (可能会大于 0.00001 左右)
        // 所以如果 $x 大于 该行最大长度, 直接设为最大长度可能是无效的
        // 在下面的二分查找中会继续处理该情况
        if ($x >= $xMax) {
            $x = $xMax
        } else if ($x < $xMin) {
            $x = $xMin
        }

        if (maxInsideY === 0) {
            Algorithm.binarySearch(0, extendedLine.length, (center, lastCenter) => {
                if (center === lastCenter) {
                    x = center + 1

                    return 0
                }

                const charRect = extendedLine.getElementRect(center)

                const left = charRect.left - measureRect.left
                if ($x < left) {
                    return -1
                }

                const right = charRect.right - measureRect.left
                if ($x > right) {
                    return 1
                }

                const half = charRect.width / 2
                x = $x - left < half ? center : center + 1

                return 0
            })
        } else {
            Algorithm.binarySearch(0, extendedLine.length, (center, lastCenter) => {
                if (center === lastCenter) {
                    x = center + 1

                    return 0
                }

                const charRect = extendedLine.getElementRect(center)
                const charRectInsideY = extendedLine.getInsideY(extendedLine.transformToInsideLayoutY(charRect.bottom))

                if (insideY > charRectInsideY) {
                    return 1
                }

                if (insideY < charRectInsideY) {
                    return -1
                }

                const left = charRect.left - measureRect.left
                if ($x < left) {
                    return -1
                }

                const right = charRect.right - measureRect.left
                if ($x > right) {
                    return 1
                }

                const half = charRect.width / 2
                x = $x - left < half ? center : center + 1

                return 0
            })
        }

        return x
    }

    getCoordByLayout($y, $x) {
        const maxHeight = this.doc.height

        if ($y > maxHeight) {
            $y = maxHeight
            $x = Infinity
        } else if ($y < 0) {
            $y = 0
            $x = 0
        }

        const line = this.doc.getLineByHeight($y)
        const lineNum = line.staticLineNum
        const extendedLine = this.lineMgr.extendLine(y)
        const lineRects = extendedLine.getClientRects()
        const insideY = extendedLine.getInsideY($y - line.top)
        const rect = lineRects[insideY]
        const measureRect = this.korwa.getLineWidthRect()
        const $xMax = rect.right - measureRect.left
        const $xMin = rect.left - measureRect.left

        let x = -1

        if ($x >= $xMax) {
            $x = $xMax
        } else if ($x < $xMin) {
            $x = $xMin
        }

        if (maxInsideY === 0) {
            Algorithm.binarySearch(0, extendedLine.length, (center, lastCenter) => {
                if (center === lastCenter) {
                    x = center + 1

                    return 0
                }

                const charRect = extendedLine.getElementRect(center)

                const left = charRect.left - measureRect.left
                if ($x < left) {
                    return -1
                }

                const right = charRect.right - measureRect.left
                if ($x > right) {
                    return 1
                }

                const half = charRect.width / 2
                x = $x - left < half ? center : center + 1

                return 0
            })
        } else {
            Algorithm.binarySearch(0, extendedLine.length, (center, lastCenter) => {
                if (center === lastCenter) {
                    x = center + 1

                    return 0
                }

                const charRect = extendedLine.getElementRect(center)
                const charRectInsideY = extendedLine.getInsideY(extendedLine.transformToInsideLayoutY(charRect.bottom))

                if (insideY > charRectInsideY) {
                    return 1
                }

                if (insideY < charRectInsideY) {
                    return -1
                }

                const left = charRect.left - measureRect.left
                if ($x < left) {
                    return -1
                }

                const right = charRect.right - measureRect.left
                if ($x > right) {
                    return 1
                }

                const half = charRect.width / 2
                x = $x - left < half ? center : center + 1

                return 0
            })
        }

        return {
            y: lineNum,
            x,
            insideY,
            maxInsideY: lineRects.length - 1,
        }
    }

    getLayoutByCoord(y, x, preferInsideY) {
        const yMax = this.doc.size

        if (y < 0) {
            y = 0
        } else if (y > yMax) {
            y = yMax - 1
        }

        // const line = this.doc.getLine(y)
        const line = this.doc.getLineWithHeight(y)

        const extendedLine = this.lineMgr.extendLine(y)
        const xMax = line.length

        if (xMax === 0) {
            return {
                y: this.transformToCursorPhysicalY(extendedLine.transformToLayoutY(0) + line.top),
                x: 0,
            }
        }

        if (x < 0) {
            x = 0
        } else if (x > xMax) {
            x = xMax
        }

        const measureRect = this.korwa.getLineWidthRect()
        const xAtLast = x === xMax // 如果是最后一格, 取 charRect 按照最后一个字取, 只不过在返回的时候返回 rect 的右边部分

        let charRectDirection = ''
        let charRect = null
        let insideY = -1

        charRect = extendedLine.getElementRect(xAtLast ? x - 1 : x)
        insideY = extendedLine.getInsideY(extendedLine.transformToInsideLayoutY(charRect.bottom))

        let $x = -1

        if (preferInsideY == null) {
            charRectDirection = xAtLast ? 'right' : 'left'
        } else {
            const diff = preferInsideY - insideY

            if (diff === 1) {
                charRect = extendedLine.getElementRect(x + 1)
                charRectDirection = 'left'
            } else if (diff === -1) {
                charRect = extendedLine.getElementRect(x - 1)
                charRectDirection = 'right'
            } else {
                charRectDirection = xAtLast ? 'right' : 'left'
            }

            insideY = preferInsideY
        }

        return {
            y: this.transformToCursorPhysicalY(extendedLine.transformToLayoutY(insideY) + line.top),
            x: charRect[charRectDirection] - measureRect.left,
        }
    }

    getInsideYByCoord(y, x) {
        const extendedLine = this.lineMgr.extendLine(y)
        const charRect = extendedLine.getElementRect(Math.min(x, extendedLine.length - 1))

        return extendedLine.getInsideY(extendedLine.transformToInsideLayoutY(charRect.bottom))
    }

    getMaxInsideYByY(y) {
        const extendedLine = this.lineMgr.extendLine(y)
        const lineRects = extendedLine.getClientRects()

        return lineRects.length - 1
    }



    transformToCursorPhysicalY(y) {
        return y - CURSOR_HEIGHT + (LINE_HEIGHT - FONT_SIZE) / 4
    }
}

module.exports = Locator
