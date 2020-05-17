class LineHelper {
    setHeight(lines, heights) {
        for (let i = 0; i < lines.length; i++) {
            lines[i].height = heights[i]
        }
    }
}

module.exports = LineHelper
