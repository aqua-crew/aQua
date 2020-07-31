class MacroStep {
    constructor(type = null, {
        author = null,
        micros = null,
        before = null,
        after = null,
    } = {}) {
        const currentTime = this.getTime()

        this.type = type
        this.author = author
        this.micros = micros
        this.before = before
        this.after = after
        this.createdTime = currentTime
        this.updatedTime = currentTime
    }

    update(micros = null) {
        this.micros = micros

        this.updatedTime = this.getTime()
    }

    getTime() {
        return new Date().getTime()
    }
}

module.exports = MacroStep
