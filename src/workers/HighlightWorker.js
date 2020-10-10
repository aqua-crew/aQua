const esprima = require('esprima')

self.addEventListener('message', event => {
    const data = event.data
    const type = data.type || 'highlight'

    self.postMessage(fns[type](data.data))
})

const fns = {
    highlight(code) {
        const tokens = esprima.tokenize(code, {
            comment: true,
            tolerant: true,
            loc: true,
            range: true,
        })

        return tokens
    }
}
