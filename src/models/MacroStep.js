class MacroStep {
    constructor(type = null, micros = null, author = null) {
        const currentTime = this.getTime()

        this.type = type
        this.author = author
        this.micros = micros
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
