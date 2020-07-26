class Progress {
    constructor({
        progress = 0,
        max = 100,
        onstart = null,
        onprogress = null,
        onend = null,
    } = {}) {
        this.progress = 0
        this.max = 100
        this.onstart = onstart
        this.onprogress = onprogress
        this.onend = onend

        this.isStart = false
    }

    set(progress, ...payload) {
        if (this.isStart) {
        } else {
            this.isStart = true
            this.onstart && this.onstart(this.progress, this.max, ...payload)
        }

        this.progress = progress
        this.onprogress && this.onprogress(this.progress, this.max, ...payload)

        if(this.progress >= this.max) {
            this.progress = this.max
            this.onend && this.onend(this.progress, this.max, ...payload)
        }
    }

    add(progress, ...payload) {
        this.set(this.progress + progress, ...payload)
    }
}

module.exports = Progress
