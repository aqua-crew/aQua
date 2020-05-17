class Scroller {
    constructor(aqua, options) {
        this.aqua = aqua

        this.$el = null
        this.y = -1
        this.speed = -1
        this.min = -1
        this.max = -1
        this.minPad = -1
        this.maxPad = -1

        // this.overflowType = 'buffer' // 'buffer', ['timeout', 'timeout'], null
        // this.overflowBuffer = 2500
        // this.overflowTimeout = 0.5
        // this.prevent = true
        this.lastScroll = 0
    }

    init({
        $el = null,
        y = -1,
        speed = -1,
        min = -1,
        max = -1,
    } = {}) {
        /* @Test */
        this.$el = $el
        this.y = y
        this.speed = speed
        this.min = min
        this.max = max

        const docMgr = this.aqua.docMgr
        const korwa = this.aqua.korwa

        this.aqua.docWatcher.on('resize', () => {
            // this.max = docMgr.height - korwa.getSingleLineHeight(docMgr.getLastLine().mod)
            this.max = docMgr.height - 25

            if (this.y > this.max) {
                this.scrollTo(this.max)
            }
        })
    }

    handleScroll(event) {
        const y = this.correctY(this.y + event.delta * this.speed)

        this.scrollTo(y)

        if (y <= this.max && y >= this.min) {
            event.preventDefault()

            return
        }
    }

    scrollTo(y = this.y) {
        requestAnimationFrame(() => {
            this.aqua.khala.emit('scroll', y, this.y)
        })

        if (this.y === y) {
            return
        }

        this.y = this.correctY(y)

        clearTimeout(this.timeoutId)

        if (new Date().getTime() - this.lastScroll >= 17) {
            this.lastScroll = new Date().getTime()
            this.$el.style.transform = `translateY(-${y}px)`
        } else {
            this.timeoutId = setTimeout(() => {
                this.lastScroll = new Date().getTime()
                this.$el.style.transform = `translateY(-${y}px)`
            }, 17)
        }
    }

    correctY(y) {
        if (y <= this.min) {
            y = this.min
        }

        if (y >= this.max) {
            y = this.max
        }

        return y
    }
}

module.exports = Scroller
