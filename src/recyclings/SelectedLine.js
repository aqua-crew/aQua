const { Recycling } = require('../interfaces/index')
const { DOM } = require('../utils/index')

class SelectedLine extends Recycling {
    created($lineCntr, reuse = false, ...payload) {
        this.$lineCntr = $lineCntr
        this.$ele = DOM.e('div', {'class': 'selected-line'})
        DOM.appendChild(this.$lineCntr, this.$ele)

        reuse && this.reuse(...payload)
    }

    unuse() {
        this.$ele.style.cssText = `display: none; top: 0px; height: 0px;`
    }

    reuse(info) {
        this.$ele.style.cssText = `display: block; top: ${info.top}px; height: ${info.height}px;`
    }

    destroy() {
        DOM.removeChild(this.$lineCntr, this.$ele)
    }
}

module.exports = SelectedLine
