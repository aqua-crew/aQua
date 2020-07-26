const KEYBOARD_MAP = {
    'backspace': 8,
    'tab': 9,
    'enter': 13,
    'shift': 16,
    'ctrl': 17,
    'alt': 18,
    'esc': 27,
    'space': 32,
    'pageup': 33,
    'pagedown': 34,
    'end': 35,
    'home': 36,
    '←': 37, 'left': 37, 'arrow-left': 37,
    '↑': 38, 'up': 38, 'arrow-up': 38,
    '→': 39, 'right': 39, 'arrow-right': 39,
    '↓': 40, 'down': 40, 'arrow-down': 40,
    'insert': 45,
    'delete': 46,
}

const MOUSE_MAP = {
    'leftmousedown': 1,
    'rightmousedown': 3,
    'scrollmousedown': 2,
    'leftmousemove': 4,
    'rightmousemove': 6,
    'scrollmousemove': 5,
    'leftmouseup': 7,
    'rightmouseup': 9,
    'scrollmouseup': 8,
    'shift': 160,
    'ctrl': 170,
    'alt': 180,
}

class Kizuna {
    constructor({
        mouseKeyAlias = Object.create(null),
        keyboardKeyAlias = Object.create(null),
        keyboardEvents = [],
        mouseEvents = Object.create(null),
    } = {}) {
        this.keyboardKeyAlias = {...KEYBOARD_MAP, ...keyboardKeyAlias}
        this.mouseKeyAlias = {...MOUSE_MAP, ...mouseKeyAlias}
        this.keyboardEvents = keyboardEvents
        this.mouseEvents = mouseEvents
        this.break = '+'

        this.keydowns = []
        this.mouseId = 0

        this.mouseState = Object.create(null)
    }

    resetState() {
        this.keydowns = []
        this.mouseState = Object.create(null)
    }

    load(keys, fn, type) {
        if (type === 'keyboard') {
            let id = -1

            const permutation = []
            if (typeof keys === 'string') {
                id = keys.trim().toLowerCase().split(this.break).reduce((total, key) => {
                    const keyCode = this.getKeyboardKeyCode(key.trim())
                    permutation.push(keyCode)
                    return total + keyCode
                }, 0)
            }

            (this.keyboardEvents[id] || (this.keyboardEvents[id] = [])).push({
                permutation,
                fn,
            })

            return
        }

        if (type === 'mouse') {
            let id = -1

            id = keys.trim().toLowerCase().split(this.break).reduce((total, key) => {
                return total + this.getMouseKeyCode(key.trim())
            }, 0)

            this.mouseEvents[id] = fn
        }
    }

    emitKeyboardFn(event, payload) {
        keydowns = this.keydowns
        let id = 0
        for (let i = 0; i < keydowns.length; i++) {
            id = id + keydowns[i]
        }

        const events = this.keyboardEvents[id]

        if (!events) return

        out: for (let i = 0; i < events.length; i++) {
            const { permutation, fn } = events[i]

            for (let j = 0; j < keydowns.length; j++) {
                if (permutation.indexOf(keydowns[j]) === -1) {
                    continue out
                }
            }

            fn(event, payload)
        }
    }

    emitMouseFn(event, payload) {
        const events = this.mouseEvents[this.mouseId]

        events && events(event, payload)
    }

    on(ele, eventType, fn, options = {
        capture: false,
        passive: false,
        once: false,
    }) {
        if (eventType === 'scroll') {
            this.on(ele, 'mousewheel', event => {
                event.delta = event.wheelDelta > 0 ? -1 : 1
                fn(event)
            }, options)

            this.on(ele, 'DOMMouseScroll', event => {
                event.delta = event.detail > 0 ? 1 : -1
                fn(event)
            }, options)

            return
        }

        ele.addEventListener(eventType, fn, options)
    }

    filterMousedown(event) {
        let id = event.which
        id = id + this.getStateBonus(event)
        this.mouseId = id
        this.mouseState = Object.create(null)
        this.emitMouseFn(event, this.mouseState)
    }

    filterMousemove(event) {
        let id = (event.which || 1) + 3
        id = id + this.getStateBonus(event)
        this.mouseId = id
        this.emitMouseFn(event, this.mouseState)
    }

    filterMouseup(event) {
        let id = event.which + 6
        id = id + this.getStateBonus(event)
        this.mouseId = id
        this.emitMouseFn(event, this.mouseState)
    }

    filterKeydown(event) {
        const keyCode = event.keyCode
        const keydownIndex = this.keydowns.indexOf(keyCode)

        if (!event.shiftKey) {
            const shiftKeyPos = this.keydowns.indexOf(16)
            if (shiftKeyPos !== -1) {
                this.keydowns.splice(shiftKeyPos, 1)
            }
        }

        if (!event.ctrlKey) {
            const ctrlKeyPos = this.keydowns.indexOf(17)
            if (ctrlKeyPos !== -1) {
                this.keydowns.splice(ctrlKeyPos, 1)
            }
        }

        if (!event.altKey) {
            const altKeyPos = this.keydowns.indexOf(18)
            if (altKeyPos !== -1) {
                this.keydowns.splice(altKeyPos, 1)
            }
        }

        if (keydownIndex === -1) {
            this.keydowns.push(keyCode)
        }

        this.emitKeyboardFn(event)
    }

    filterKeyup(event) {
        const keyCode = event.keyCode
        const keydownIndex = this.keydowns.indexOf(keyCode)

        /* 减去输入法开启时造成的残留 */
        const progressIndex = this.keydowns.indexOf(229)
        if (progressIndex !== -1) {
            this.keydowns.splice(progressIndex, 1)
        }

        if (!event.shiftKey && keydownIndex !== -1) {
            this.keydowns.splice(keydownIndex, 1)
        }

        if (!event.ctrlKey && keydownIndex !== -1) {
            this.keydowns.splice(keydownIndex, 1)
        }

        if (!event.altKey && keydownIndex !== -1) {
            this.keydowns.splice(keydownIndex, 1)
        }

        if (keyCode !== 16 && keyCode !== 17 && keyCode !== 18 && keydownIndex !== -1) {
            this.keydowns.splice(keydownIndex, 1)
        }
    }

    filterInput(event) {
        console.error('event', event)
    }

    setKeyboardKeyAlias(name, code) {
        this.keyboardKeyAlias[name] = code
    }

    setMouseKeyAlias(name, code) {
        this.mouseKeyAlias[name] = code
    }

    /* Private  */

    getKeyboardKeyCode(key) {
        return this.keyboardKeyAlias[key] || key.toUpperCase().charCodeAt(0)
    }

    getMouseKeyCode(key) {
        return this.mouseKeyAlias[key]
    }

    getStateBonus(event) {
        let id = 0

        if (event.shiftKey) {
            id = id + 160
        }

        if (event.ctrlKey) {
            id = id + 170
        }

        if (event.altKey) {
            id = id + 180
        }

        return id
    }
}

module.exports = Kizuna
