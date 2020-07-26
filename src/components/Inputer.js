const { Limiter } = require('../utils/index')

class Inputer {
    constructor(aqua, $inputer = null) {
        this.aqua = aqua
        this.$inputer = $inputer

        this.limitedPoll = Limiter.limit(this.normalPoll.bind(this), 34, 34)
    }

    init() {
        this.setInputer(this.aqua.uiMgr.get('inputer'))
    }

    setInputer($inputer) {
        this.$inputer = $inputer
    }

    poll(immediate = false) {
        immediate ? this.normalPoll() : this.limitedPoll()
    }

    normalPoll() {
        const text = this.$inputer.value
        this.$inputer.value = ''

        this.aqua.khala.emit('input', text)
    }
}

module.exports = Inputer
