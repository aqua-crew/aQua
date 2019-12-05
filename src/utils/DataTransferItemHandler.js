module.exports = {
    handle(dataTransferItem, handler) {
        const { kind, type } = dataTransferItem

        if (kind === 'string') {
            if (type.match('^text/plain')) {
                dataTransferItem.getAsString(handler.text)
            } else if (type.match('^text/html')) {
                dataTransferItem.getAsString(handler.html)
            } else {
                console.error(`Unknown tpye ${type} in string`)
            }
        }

        if (kind === 'file') {
            console.warn('find file', type)
            if (type.match('^image/')) {
                dataTransferItem.getAsFile(handler.file)
            } else {
                console.error(`Unknown tpye ${type} in file`)
            }
        }
    }
}
