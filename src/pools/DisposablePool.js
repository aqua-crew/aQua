const { Pool } = require('../interfaces/index')
const { DOM, rAF } = require('../utils/index')
const Template = require('../templates/index')

class DisposablePool extends Pool {
    constructor($container, template, pool = []) {
        super()
        this.$container = $container
        this.templateType = template + 'Tpl'
        this.pool = pool
        this.usedPointer = 0
        this.ids = Object.create(null)
    }

    resetUnuse() {
        this.usedPointer = 0
        this.ids = Object.create(null)
    }

    get(id) {
        if (id !== undefined) {
            if (this.ids[id]) {
                return null
            }

            this.ids[id] = true
        }

        let $element = this.pool[this.usedPointer]

        if (!$element) {
            $element = Template[this.templateType]
            this.put($element)
        }

        if (!$element.parentNode) {
            rAF(() => {
                DOM.appendChild(this.$container, $element)
            })
        }

        this.usedPointer = this.usedPointer + 1

        return $element
    }

    put($element) {
        this.pool.push($element)
    }

    clearUnuse() {
        for (let i = this.usedPointer; i < this.pool.length; i++) {
            const $element = this.pool[i]

            if ($element) {
                rAF(() => {
                    $element.remove()
                })
            }
        }

        this.pool.length = this.usedPointer
    }
}

module.exports = DisposablePool
