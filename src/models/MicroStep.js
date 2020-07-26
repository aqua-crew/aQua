class MicroStep {
    constructor(record = null) {
        const currentTime = this.getTime()

        this.record = record
        this.createdTime = currentTime
    }

    getTime() {
        return new Date().getTime()
    }
}

module.exports = MicroStep
