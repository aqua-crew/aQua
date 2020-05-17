const { Processor } = require('../interfaces/index')
const { DOM } = require('../utils/index')

const modes = require('../modes/index')

const Colorful = {
    'Aqua': 'aqua',
}

class CodeProcessor extends Processor {
    constructor(docWatcher, lineMgr) {
        super('Code')

        this.docWatcher = docWatcher
        this.lineMgr = lineMgr

        this.loadModes(modes)
    }

    onCreated() {
        this.aim('string')
        this.aim('StringAsset')
    }

    tokenize(data, type) {
        const mode = this.getMode(type)

        return mode.tokenize(data)
    }

    toElement(token) {
        const { type, value } = token
        const dye = Colorful[value] || type

        return type !== null ? DOM.e('span', {'class': 'aqua-block-' + dye}, [DOM.t(value)]) : DOM.t(value)
    }

    toElementsAndMount(tokens, $root) {
        const len = tokens.length

        for (let i = 0; i < len; i++) {
            const $child = this.toElement(tokens[i])

            DOM.appendChild($root, $child)
        }
    }

    loadModes(modes) {
        this.modes = Object.create(null)

        for (let name in modes) {
            this.loadMode(modes[name])
        }
    }

    getMode(type) {
        return this.modes[type]
    }

    loadMode(mode, modes = this.modes) {
        const names = (typeof mode.name === 'string') ? [mode.name] : mode.name

        for (let i = 0; i < names.length; i++) {
            const name = mode.caseSensitive ? names[i] : names[i].toLowerCase()

            modes[name] = mode
        }
    }
}

module.exports = CodeProcessor
