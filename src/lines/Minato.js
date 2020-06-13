const { Line } = require('../interfaces/index')
const { DOM } = require('../utils/index')
const { HTMLVariables } = require('../enums/index')

const DisableMouseEvent = HTMLVariables.DisableMouseEvent


class Minato extends Line {
    constructor() {
        super('Minato')

        this.$template = this.template()
    }

    create($content = null) {
        const $line = this.$template.cloneNode(true)

        if ($content) {
            DOM.appendChild($line.children[1].firstChild, $content)
        }

        return $line
    }

    template($content = null) {
        return (
            DOM.e('div', {'class': 'line line-minato'}, [
                DOM.e('div', {'class': 'prefix', 'aqua-is-line-number': 'true'}, [
                    DOM.e('div', {'class': 'line-num'}),
                ]),

                DOM.e('div', {'class': 'suffix'}, [
                    DOM.e('code', {}, $content ? [$content] : null),
                ]),
            ])
        )
    }
}

module.exports = Minato
