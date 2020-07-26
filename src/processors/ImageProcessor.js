const { Processor } = require('../interfaces/index')
const { DOM } = require('../utils/index')

class ImageProcessor extends Processor {
    constructor(docWatcher, korwa) {
        super('Image')

        this.docWatcher = docWatcher
        this.korwa = korwa
    }

    onCreated() {
        this.aim('ImageAsset')
    }

    tokenize(data, type) {
        return [{
            type: 'image',
            value: data.src,
        }]
    }

    toElement(token, line) {
        const { type, value } = token
        const $img = new Image()
        const measurer = this.korwa.getMeasurer(line.id, line)

        const cb = () => {
            const height = measurer()

            if (!line.isAlive()) {
                return
            }

            line.height = height
            console.error('line', line)
            this.docWatcher.emit('resize', [line])
        }

        $img.onload = cb
        $img.onerror = cb

        $img.src = value
        $img.classList.add('aqua-block' + type)

        return $img
    }

    toElementsAndMount(tokens, $root, line) {
        const len = tokens.length

        for (let i = 0; i < len; i++) {
            const $child = this.toElement(tokens[i], line)

            DOM.appendChild($root, $child)
        }
    }
}

module.exports = ImageProcessor
