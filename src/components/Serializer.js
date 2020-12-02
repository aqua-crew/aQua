class Serializer {
    constructor(aqua) {
        this.aqua = aqua
    }

    serializeCursor() {
        const result = []
        const cursorInfo = this.aqua.cursorMgr.extract()

        result.push(cursorInfo.primary, cursorInfo.cursors)

        return JSON.stringify(result)
    }

    deserializeCursor(cursorStr) {
        const [ primary, cursors ] = JSON.parse(cursorStr)

        return {
            primary,
            cursors,
        }
    }

    serializeDoc() {
        return JSON.stringify(this.aqua.docMgr.extract())
    }

    deserializeDoc(docStr) {
        return JSON.parse(docStr)
    }

    serializeChronicle() {
        return JSON.stringify(this.aqua.chronicle.extract())
    }

    deserializeChronicle(chronicleStr) {
        return JSON.parse(chronicleStr)
    }

    serializeOption() {
        const options = {
            scroller: {
                y: this.aqua.scroller.y
            }
        }

        return JSON.stringify(options)
    }

    deserializeOption(optionStr) {
        return JSON.parse(optionsStr)
    }

    serialize({
        doc = true,
        cursor = true,
        chronicle = true,
        option = true,
    } = {}) {
        const result = Object.create(null)

        if (doc) {
            result.doc = this.aqua.docMgr.extract()
        }

        if (cursor) {
            const cursorInfo = this.aqua.cursorMgr.extract()

            result.cursor = [cursorInfo.primary, cursorInfo.cursors]
        }

        if (chronicle) {
            result.chronicle = this.aqua.chronicle.extract()
        }

        if (option) {
            result.option = {
                scroller: {
                    y: this.aqua.scroller.y
                }
            }
        }

        return JSON.stringify(result)
    }

    deserialize(aqua) {
        const result = JSON.parse(aqua)

        console.warn('deserialize', result)
        return result
    }
}

module.exports = Serializer
