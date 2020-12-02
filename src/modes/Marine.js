const Character = {
    // https://tc39.github.io/ecma262/#sec-white-space
    isWhiteSpace(cp) {
        return (cp === 0x20) || (cp === 0x09) || (cp === 0x0B) || (cp === 0x0C) || (cp === 0xA0) ||
            (cp >= 0x1680 && [0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(cp) >= 0);
    },

    // https://tc39.github.io/ecma262/#sec-line-terminators
    isLineTerminator(cp) {
        return (cp === 0x0A) || (cp === 0x0D) || (cp === 0x2028) || (cp === 0x2029);
    },
}

const TokenType = {
    StringLiteral: 1,
}

const QuotationType = {
    SingleQuotation: 1,
    DoubleQuotation: 2,
}

const ScanType = {
    WhiteSpace: 1,
    Word: 2,
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

    scanWord() {
        const start = this.index
        const char = this.code[start]

        let value = ''

        while(!this.isEof()) {
            const char = this.code[this.index++]

            if (Character.isLineTerminator(char.charCodeAt(0))) {
                this.lineNum++
                break
            }
        }


    }

    scanStringLiteral() {
        const start = this.index
        const quote = this.code[start]

        let quoteType
        if (quote === '\'') {
            quoteType = QuotationType.SingleQuotation
        } else if (quote === '"') {
            quoteType = QuotationType.DoubleQuotation
        } else {
            // @Exception
        }

        let value = ''
        this.index++

        while(!this.isEof()) {
            const char = this.code[this.index++]

            if (char === quote) {
                quote = ''
                break
            }

            if (Character.isLineTerminator(char.charCodeAt(0))) {
                this.lineNum++
                break
            }

            value += char
        }

        return {
            type: TokenType.StringLiteral,
            value,
            start,
            end: this.index,
            quote: QuotationType,
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
select line,
from aqua.js, shion.js
where
AND
aqua.line.index < 10
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
        const objectList = []
        const fileList = []
        const filterList = []
        const actionList = []


    }
}

module.exports = Marine
