const { Line } = require('../interfaces/index')
const { DOM } = require('../utils/index')
const { HTMLVariables } = require('../enums/index')

const DisableMouseEvent = HTMLVariables.DisableMouseEvent

class Text extends Line {
    constructor() {
        super('Text')

        this.$template = this.template()
    }

    create($content = null) {
        const $line = this.$template.cloneNode(true)

        if ($content) {
            DOM.appendChild($line.children[1].firstChild, $content)
        }

        return $line
    }

    template(content = null) {
        return (
            DOM.e('div', {'class': 'line'}, [
                DOM.e('div', {'class': 'prefix', [DisableMouseEvent]: 'true'}, [
                    DOM.e('div', {'class': 'line-num'})
                ]),

                DOM.e('div', {'class': 'suffix'}, [
                    DOM.e('code', {}, content ? [content] : null),
                ]),
            ])
        )
    }
}

module.exports = Text
