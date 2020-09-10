importScripts('esprima')

self.addEventListener('onmessage', event => {
    const data = event.data

    highlight(data)
    console.log('data', data)
})

function highlight() {

}
