const FnHelper = {
    limit(fn, debounceTimeout = 16, throttleTimeout = debounceTimeout) {
        let timeoutId = null
        let lastTime = 0

        return function(...payload) {
            clearTimeout(timeoutId)

            const currentTime = new Date().getTime()

            if (currentTime - lastTime > debounceTimeout) {
                lastTime = currentTime
                fn(...payload)
            } else {
                timeoutId = setTimeout(() => {
                    lastTime = currentTime
                    fn(...payload)
                }, throttleTimeout)
            }
        }
    }
}

module.exports = FnHelper
