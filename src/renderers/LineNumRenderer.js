const { rAF } = require('../utils/index')

class LineNumRenderer {
    constructor() {
        this.applyName = 'lineNum'
    }

    render(viewport) {
        const $lines = viewport.$lines
        const start = viewport.renderArea.start

        for (let i = 0; i < $lines.length; i++) {
            this.updateLineNum($lines[i], start + i + 1)
        }
    }

    updateLineNum($line, lineNum) {
        rAF(() => {
            $line.firstChild.textContent = lineNum
        })
    }
}

module.exports = LineNumRenderer
