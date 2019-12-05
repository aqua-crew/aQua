const { Line } = require('../interfaces/index')
const { DOM } = require('../utils/index')

class Aqua extends Line {
    constructor(aqua) {
        super()
        this.aqua = aqua
    }

    /* 创建新行 */
    create(content) {
        return this.template(content)
    }

    template(content) {
        return (
            DOM.e('div', {'class': 'line line-aqua'}, [
                DOM.e('div', {'class': 'prefix', 'aqua-is-line-number': 'true'}),

                DOM.e('div', {'class': 'suffix'}, [
                    DOM.e('code', {}, [content]),
                ]),
            ])
        )
    }
}

module.exports = Aqua
