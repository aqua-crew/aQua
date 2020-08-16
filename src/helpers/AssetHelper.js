module.exports = {
    append(source, content) {
        const sourceType = typeof source
        const contentType = typeof content

        let sourceAsset = null
        let contentAsset = null

        if (sourceType === 'string') {
            if (contentType === 'string') {
                return source + content
            }

            sourceAsset = new StringAsset(source)
            contentAsset = content
        } else {
            sourceAsset = source

            if (contentType === 'string') {
                contentAsset = new StringAsset(content)
            }
        }

        sourceAsset.setTail(contentAsset)

        return sourceAsset
    }
}
