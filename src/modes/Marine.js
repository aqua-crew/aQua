const Character = {
    isWhiteSpace() {

    }
}

const TokenType = {
    StringLiteral: 1,
}

class Scanner {
    constructor(code = '', options = {
        skipWhitespace: false,
        skipComment: false,
    }) {
        this.code = code
        this.length = code.length
        this.lineNum = 0
        this.index = 0
    }

    isEof() {
        return this.index >= this.length
    }

    scanStringLiteral() {
        const start = this.index
        const quote = this.code[start]

        let value = ''
        this.index++

        while(!this.isEof()) {
            const ch = this.code[this.index++]

            if (ch === quote) {
                quote = ''
                break
            }
        }

        return {
            type: TokenType.StringLiteral,
            value,
            start,
            end: this.index,
        }
    }

    scanObjectList() {

    }

    scanFileList() {

    }

    scanFilterList() {

    }

    scanLogicExp() {

    }

    scanActionList() {

    }

    scanLex() {
        const char = this.code[this.index]

        if (char === '\'' || char === '"') {
            return this.scanStringLiteral()
        }

        return this.scanWord()
    }

/*
select line
from aqua.js, shion.js
where
aqua.line.index < 10
AND
aqua.line.index > 5
DO


 */

    scanContext() {

    }

    scanObjectList() {

    }
}

const ContextType = {
    RequestObjectList: 'requestObjectList',

}

class Tokenizer {
    constructor(code, options) {
        this.scanner = new Scanner
        this.buffer = []
    }

    next() {
        if (!this.scanner.isEof()) {

        }

        const word = this.scanner.scanLex()

        return this.buffer.shift()
    }
}

class Marine {
    constructor() {
        this.tokenizer = new Tokenizer
    }

    tokenize(code = '', options = {}, cb) {
        const tokens = []

        while(true) {
            const token = this.tokenizer.next()

            if (!token) {
                break
            }

            if (cb) {
                token = cb(token)
            }

            tokens.push(token)
        }

        return tokens
    }

    parse() {
        const sandbox
    }
}

module.exports = Marine
