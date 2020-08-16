const { DOM, Echo } = require('../utils/index')
const Measurers = require('../measurers/index')

class Korwa {
    constructor(aqua) {
        this.aqua = aqua
    }

    init() {
        const extend = this.extend.bind(this)

        Object.keys(Measurers).forEach(name => {
            new Measurers[name](this.aqua, extend, Korwa)
        })
    }

    getViewportRect() {
        return this.aqua.uiMgr.get('viewport').getBoundingClientRect()
    }

    getScrollerRect() {
        return this.aqua.uiMgr.get('scroller').getBoundingClientRect()
    }

    getLineWidthRect() {
        return this.aqua.uiMgr.get('lineWidthCntr').getBoundingClientRect()
    }

    getClientRect($ele) {
        return $ele.getBoundingClientRect()
    }

    getClientRects($ele) {
        return $ele.getClientRects()
    }

    extend(functionOrKey, value, isDefineProperty = false) {
        let key = ''

        if (typeof functionOrKey === 'function') {
            const fn = functionOrKey
            const fnNames = fn.name.split(' ') // 如果 fn 被 bind 过, 那么 fn.name = 'bound fn'

            value = fn
            key = fnNames[fnNames.length - 1]
        } else {
            key = functionOrKey
        }

        if (this[key]) {
            Echo.error('Korwa.prototype.extend', `key ${key} exist`)
        }

        if (isDefineProperty) {
            Object.defineProperty(this, key, value)

            return
        }

        this[key] = value
    }
}

module.exports = Korwa
