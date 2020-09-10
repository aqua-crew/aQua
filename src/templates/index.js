const { DOM } = require('../utils/index')

class Template {
    get cursorTpl() {
        return DOM.e('i', {'class': 'anchor', 'style': 'left: 0px; top: 0px;'})
    }

    get selectionTpl() {
        return DOM.e('div', {'class': 'selection'})
    }

    get selectedLineTpl() {
        return DOM.e('div', {'class': 'selected-line'})
    }

    get cursorMarkTpl() {
        return DOM.e('div', {'class': 'aqua-cursor-mark'})
    }

    get dictionaryItemTpl() {
        return DOM.e('div', {'class': 'dictionary-item'})
    }
}

module.exports = new Template
