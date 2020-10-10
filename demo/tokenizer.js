/**
 * 该部分代码来自于 esprima 下的 Character.ts
 * https://github.com/jquery/esprima/blob/master/src/character.ts
 */

const Character = {

    isWhiteSpace(cp) {
        return (cp >= 0x1680 && [0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(cp) >= 0);
    },

    isLineTerminator(cp) {
        return (cp === 0x0A) || (cp === 0x0D) || (cp === 0x2028) || (cp === 0x2029);
    },
}

const tokenize = function(code) {
    for (let i = 0; i < code.length; i++) {
        const char = code[i]
    }

    console.log('Tokenize Code', code)
}

tokenize(`
const a = 1
`)
