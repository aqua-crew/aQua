const { DOM } = require('../utils/index')

class Template {
    get cursorTpl() {
        return DOM.e('i', {'class': 'anchor', 'style': 'left: 0px; top: 0px;'})
    }

    get lineTpl() {
        return DOM.e('div', {'class': 'line'}, [
            DOM.e('div', {'class': 'prefix', 'aqua-is-line-number': 'true'}),

            DOM.e('div', {'class': 'suffix'}, [
                DOM.e('code', {}, content ? [content] : null),
            ]),
        ])
    }

    get selectionTpl() {
        return DOM.e('div', {'class': 'selection'})
    }

    get selectedLineTpl() {
        return DOM.e('div', {'class': 'selected-line'})
    }
}

module.exports = new Template
