const Character = {
    isWhiteSpace() {

    }
}

const TokenType = {
    Eof: 'eof',
    Select: 'Select',
    ObjectListId: 'objectListId',
    Object: 'object',
    File: 'file',

    Comma: 'comma',
    Dot: 'dot',
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



        const charCode = this.code.charCodeAt(this.index)

        /* charcode 为 s 开头 */
        if (charCode === ) {

        }
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
