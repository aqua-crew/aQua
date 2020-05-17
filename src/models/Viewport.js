class Viewport {
    constructor({
        y = 0,
        height = 0,
        $padding = null,
        padding = 0,
        lps = 0,
        lines = [],
        $lines = [],
        status = Object.create(null),
    } = {}) {
        this.y = y
        this.height = height
        this.$padding = $padding
        this.padding = 0
        this.lps = lps // Lines Per Screen
        this.lines = lines
        this.$lines = $lines
        this.status = status

        this.visibleArea = {
            start: -1,
            end: -1,
        }

        this.renderArea = {
            start: -1,
            end: -1,
        }

        this.lines = []
    }

    get ceiling() {
        return this.y
    }

    get floor() {
        return this.y + this.height
    }

    pad(px) {
        this.padding = px
        this.$padding.style.transform = `translateY(${px}px)`
    }

    update(y) {
        this.y = y

        return {
            ceiling: this.ceiling,
            floor: this.floor,
        }
    }

    isVisionLost() {
        const visibleArea = this.visibleArea
        const renderArea = this.renderArea

        return visibleArea.end > renderArea.end || visibleArea.start < renderArea.start
    }

    updateVisibleArea(start, end) {
        const visibleArea = this.visibleArea

        visibleArea.start = start
        visibleArea.end = end

        return visibleArea
    }

    getVisibleArea() {
        return this.visibleArea
    }

    updateRenderArea(start, end) {
        const renderArea = this.renderArea

        renderArea.start = start
        renderArea.end = end

        return renderArea
    }

    getRenderArea() {
        const { start, end } = this.renderArea

        return {
            start,
            end,
        }
    }

    get$Line(lineNum) {
        const { start, end } = this.renderArea

        if (lineNum < start || lineNum > end) {
            return null
        }

        return this.$lines[lineNum - start]
    }

    getLine(lineNum) {
        // const { start, end } = this.renderArea

        // if (lineNum < start || lineNum > end) {
        //     return null
        // }

        // return this.lines[lineNum - start]
    }
}

module.exports = Viewport
