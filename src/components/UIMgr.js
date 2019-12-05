const { DOM } = require('../utils/index')

class UIMgr {
    constructor(aqua) {
        this.aqua = aqua

        this.ui = Object.create(null)
        this.store = Object.create(null)
    }

    load(name, fn) {
        const isExist = this.ui[name]
        if (isExist) {
            console.error(`UI fn name ${name} has been registered`)

            return
        }

        this.ui[name] = fn
    }

    render(name, ...payload) {
        const fn = this.ui[name]

        if (!fn) {
            console.error(`${name} render function not exist`)

            return
        }

        return fn(...payload)
    }

    set(name, $node) {
        this.store[name] = $node
    }

    get(name) {
        return this.store[name]
    }

    mount(parent, children) {
        DOM.appendChild(parent, children)
    }

    mountByString(structure, {
        placeholder = Object.create(null),
        mounted = null,
        split = 4,
    } = {}) {
        const $root = DOM.f()
        const tokens = getTokens(structure, split)
        const map = {
            0: $root,
        }

        for (let i = 1; i < tokens.length; i = i + 2) {
            const token = tokens[i]
            const level = tokens[i - 1]
            const $ele = token[0] === '$' ? placeholder[token] : this.render(token)
            map[level] = $ele
            DOM.appendChild(map[level - 1], $ele)
            mounted && mounted($ele, token)
        }

        return $root

        function getTokens(structure, split) {
            const tokens = []
            let token = ''
            let curType = 'space' // 'space'
            let preSpace = 0

            for (let i = 0; i < structure.length; i++) {
                const char = structure[i]

                if (char === '\n') {
                    continue
                } else if (char === ' ') {
                    if (curType === 'word') {
                        token = sendToken(tokens, token)
                    }

                    curType = 'space'
                    token = token + char
                } else {
                    if (curType === 'space') {
                        if (tokens[0] === undefined) {
                            preSpace = token.length
                            token = sendToken(tokens, 1)
                        } else {
                            token = sendToken(tokens, (token.length - preSpace) / split + 1)
                        }
                    }

                    curType = 'word'
                    token = token + char
                }
            }

            if (curType === 'word') {
                token = sendToken(tokens, token)
            }

            return tokens
        }

        function sendToken(tokens, token) {
            tokens.push(token)
            return ''
        }
    }
}

module.exports = UIMgr
