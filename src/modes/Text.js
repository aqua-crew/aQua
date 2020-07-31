const { Mode } = require('../interfaces/index')

function sendToken(tokens, token) {
    tokens.push(token)
}

const Syntax = {
    text: {
        '<': function(next, token, tokens, modes, i) {
            if (token.length !== 0) {
                sendToken(tokens, {
                    type: 'word',
                    value: token,
                })
            }

            sendToken(tokens, {
                type: 'mark',
                value: '<',
            })
        },

        '+': function(next, token, tokens, modes, i) {
            if (token.length !== 0) {
                sendToken(tokens, {
                    type: 'word',
                    value: token,
                })
            }

            sendToken(tokens, {
                type: 'plus',
                value: '+',
            })
        },

        '　': function(next, token, tokens, modes, i) {
            if (token.length !== 0) {
                sendToken(tokens, {
                    type: 'word',
                    value: token,
                })
            }

            modes.push('whitespace')

            return {
                token: next
            }
        },

        ' ': function(next, token, tokens, modes, i) {
            if (token.length !== 0) {
                sendToken(tokens, {
                    type: 'word',
                    value: token,
                })
            }

            modes.push('whitespace')

            return {
                token: next
            }
        },

        '\n': function (next, token, tokens, modes, i) {
            if (token.length !== 0) {
                sendToken(tokens, {
                    type: 'word',
                    value: token,
                })
            }

            sendToken(tokens, {
                type: 'newline',
                value: '\n',
            })
        },

        default: function (next, token, tokens, modes, i) {
            if (next === undefined) {
                sendToken(tokens, {
                    type: 'word',
                    value: token,
                })
            } else {
                token = token + next
            }

            return {
                token,
            }
        }
    },

    whitespace: {
        ' ': function(next, token, tokens, modes, i) {
            return {
                type: 'whitespace',
                token: token + next
            }
        },

        '　': function(next, token, tokens, modes, i) {
            return {
                type: 'whitespace',
                token: token + next
            }
        },

        default: function (next, token, tokens, modes, i) {
            modes.pop()

            sendToken(tokens, {
                type: null,
                value: token,
            })

            return {
                i: i - 1,
            }
        }
    }
}

class Text extends Mode {
    constructor() {
        super()

        this.name = ['text', 'txt']
    }

    tokenize(raw, tokens = []) {
        return raw.split('').map(char => ({
            type: 'word',
            value: char,
        }))
        const len = raw.length
        const modes = ['text']
        let token = ''

        for (let i = 0; i < len + 1; i++) {
            const current = raw[i]
            const mode = Syntax[modes[modes.length - 1]]
            const matched = mode[current]

            if (!matched) {
                const feedback = mode.default(current, token, tokens, modes, i) || {}
                i = feedback.i || i
                token = feedback.token || ''

                continue
            }

            const feedback = matched(current, token, tokens, modes, i) || {}
            i = feedback.i || i
            token = feedback.token || ''
        }

        console.log(tokens)
        return tokens
    }
}

module.exports = Text
