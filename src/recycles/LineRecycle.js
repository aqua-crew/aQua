const { Recycle } = require('../interfaces/index')
const { DOM } = require('../utils/index')

class LineRecycle extends Recycle {
    onCreate() {
        this.$ele = null
    }

    onDestroy() {
        this.$ele.remove()
    }

    unuse() {

    }

    reuse(info) {

    }
}

module.exports = LineRecycle
