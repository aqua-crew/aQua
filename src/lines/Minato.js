const { Line } = require('../interfaces/index')
const { DOM } = require('../utils/index')

class Minato extends Line {
    constructor() {
        super('Minato')

        this.$template = this.template()
    }

    create(content = null) {
        return this.$template.cloneNode(true)
    }

    template(content = DOM.t('')) {
        return (
            DOM.e('div', {'class': 'line line-minato'}, [
                DOM.e('div', {'class': 'prefix', 'aqua-is-line-number': 'true'}),

                DOM.e('div', {'class': 'suffix'}, [
                    DOM.e('code', {}, content ? [content] : null),
                ]),
            ])
        )
    }
}

module.exports = Minato
