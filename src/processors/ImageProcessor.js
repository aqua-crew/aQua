const { Processor } = require('../interfaces/index')
const { DOM } = require('../utils/index')
const { LineStatus } = require('../enums/index')

class ImageProcessor extends Processor {
    constructor(docWatcher, korwa) {
        super('Image')

        this.docWatcher = docWatcher
        this.korwa = korwa

        this.cache = Object.create(null)
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

        if (this.cache[value]) {
            return this.cache[value]
        }

        const $img = new Image()

        this.cache[value] = $img

        const cb = () => {
            if (!line.isAlive()) {
                return
            }

            line.setStatus(LineStatus.UPDATED)

            this.docWatcher.emit('change', {
                effectLines: [line],
            })
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
