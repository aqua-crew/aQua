const { rAF, DOM } = require('../../utils/index')

class DictionaryRenderer {
    constructor(aqua) {
        this.applyName = 'dictionary'

        this.aqua = aqua
        this.cursors = aqua.cursorMgr
        this.korwa = aqua.korwa
        this.inputer = aqua.inputer

        this.isOpen = false
        this.currentDictionary = []

        this.init(aqua)
    }

    init(aqua) {
        this.$list = DOM.e('div', {'class': 'dictionary-list'})
        this.$container = DOM.e('div', {'class': 'dictionary-container'}, [this.$list])

        aqua.uiMgr.get('lineWidthCntr').appendChild(this.$container)

        this.$container.addEventListener('mousedown', event => {
            event.stopPropagation()
        })

        this.$container.addEventListener('mouseup', event => {
            event.stopPropagation()

            this.inputer.focus()

            let target = event.target
            let index = target.dataset.index

            if (index === undefined) {
                target = target.parentNode
            }

            index = target.dataset.index

            const content = this.currentDictionary[index]

            this.cursors.pureTraverse(cursor => {
                this.aqua.write(content.keyword, cursor)
            })

            this.close()
        })
    }

    $template(data) {
        return DOM.e('div', {'class': 'dictionary-item', 'data-index': data.index}, [
            DOM.e('span', {'class': 'keyword'}, data.keyword),
            DOM.e('span', {'class': 'type'}, data.type),
        ])
    }

    render(viewport, dictionary) {
        this.currentDictionary = dictionary

        if (!dictionary && dictionary.length === 0) {
            this.close()

            return
        }

        const primary = this.cursors.getPrimary()

        this.update(dictionary)
        this.open(primary.$y + this.korwa.getSingleLineHeight(), primary.$x, dictionary)
    }

    update(dictionary, selectIndex) {
        this.$list.innerHTML = ''
        DOM.appendChild(this.$list,
            dictionary.map((item, index) => (item.index = index, this.$template(item)))
        )
    }

    open($y, $x, dictionary = []) {
        this.isOpen = true

        rAF(() => {
            this.$container.style.cssText = `top: ${$y}px; left: ${$x}px`

            this.$container.classList.add('dictionary-container-active')
        })
    }

    close() {
        this.isOpen = false

        rAF(() => {
            this.$container.classList.remove('dictionary-container-active')
        })
    }
}

module.exports = DictionaryRenderer
