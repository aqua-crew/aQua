const { Mode } = require('../interfaces/index')
// const esprima = require('esprima')

function genWhitespace(num = 1) {
    let whitespace = ''

    while(num--) {
        whitespace = whitespace + ' '
    }

    return whitespace
}

class JavaScript extends Mode {
    constructor() {
        super()

        this.name = ['javascript', 'js']
    }

    tokenize(code) {
        // const tokens = esprima.tokenize(code, {
        //     tolerant: true,
        //     comment: true,
        //     range: true,
        // })

        // let start = 0
        // const result = []

        // tokens.forEach(token => {
        //     console.log('token', token)
        //     const whitespaceCount = token.range[0] - start

        //     if (whitespaceCount > 0) {
        //         result.push({
        //             type: null,
        //             value: genWhitespace(whitespaceCount),
        //         })
        //     }

        //     result.push(token)

        //     start = token.range[1]
        // })

        // const whitespaceCount = code.length - start

        // if (whitespaceCount > 0) {
        //     result.push({
        //         type: null,
        //         value: genWhitespace(whitespaceCount),
        //     })
        // }

        // return result

        return [{
            type: 'Temp',
            value: code,
        }]
    }
}

module.exports = JavaScript
