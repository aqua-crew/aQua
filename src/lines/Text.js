const { Line } = require('../interfaces/index')
const { DOM } = require('../utils/index')

class Text extends Line {
    constructor() {
        super('Text')
    }

    template(content) {
        return (
            DOM.e('div', {'class': 'line'}, [
                DOM.e('div', {'class': 'prefix', 'aqua-is-line-number': 'true'}),

                DOM.e('div', {'class': 'suffix'}, [
                    DOM.e('code', {}, content ? [content] : null),
                ]),
            ])
        )
    }
}

module.exports = Text
