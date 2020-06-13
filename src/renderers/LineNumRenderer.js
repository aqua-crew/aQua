const { rAF } = require('../utils/index')

const START_FROM = 1

class LineNumRenderer {
    constructor(aqua) {
        this.applyName = 'lineNum'
    }

    render(viewport) {
        const $lines = viewport.$lines
        const start = viewport.renderArea.start

        for (let i = 0; i < $lines.length; i++) {
            const $lineNum = $lines[i].firstChild.firstChild

            this.updateLineNum($lineNum, start + i + START_FROM)
        }
    }

    updateLineNum($lineNum, lineNum) {
        rAF(() => {
            $lineNum.textContent = lineNum
        })
    }
}

module.exports = LineNumRenderer
