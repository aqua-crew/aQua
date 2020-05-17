const { Recycle } = require('../interfaces/index')
const { DOM } = require('../utils/index')

class SelectedLineRecycle extends Recycle {
    onCreate($lineCntr, reuse = false, ...payload) {
        this.$lineCntr = $lineCntr
        this.$ele = DOM.e('div', {'class': 'selected-line'})
        DOM.appendChild(this.$lineCntr, this.$ele)

        this.reuse(...payload)
    }

    onDestroy() {
        DOM.removeChild(this.$lineCntr, this.$ele)
    }

    unuse() {
        this.$ele.style.cssText = `display: none; top: 0px; height: 0px;`
    }

    reuse(info) {
        this.$ele.style.cssText = `display: block; top: ${info.top}px; height: ${info.height}px;`
    }
}

module.exports = SelectedLineRecycle
