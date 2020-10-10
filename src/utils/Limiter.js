function getCurrentTime() {
    return new Date().getTime()
}

module.exports = {
    debounce(fn, timeout = 300) {
        let timeoutId = 0

        return function(...payload) {
            clearTimeout(timeoutId)

            timeoutId = setTimeout(fn, timeout, ...payload)
        }
    },

    limit(fn, timeout = 17, lastTimeout = 17) {
        let timeoutId = null
        let lastTime = 0

        return function(...payload) {
            clearTimeout(timeoutId)

            if (getCurrentTime() - lastTime >= timeout) {
                lastTime = getCurrentTime()
                fn(...payload)
            } else {
                timeoutId = setTimeout(() => {
                    lastTime = getCurrentTime()
                    fn(...payload)
                }, lastTimeout)
            }
        }
    },

    toNextTick(fn, timeout = 17) {
        let lastTime = 0
        let busy = false

        return function(...payload) {
            if (busy) {
                return
            }

            busy = true

            setTimeout(() => {
                fn(...payload)
                lastTime = getCurrentTime()
                busy = false
            }, Math.max(0, timeout - getCurrentTime() + lastTime))
        }
    },
}
