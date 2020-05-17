class Processor {
    constructor(name = null, targets = []) {
        this.name = name
        this.desc = ''
        this.targets = targets

        this.onCreated()
    }

    aim(target = null) {
        if (!target) {
            return
        }

        this.targets.push(target)
    }

    tokenize(data) {
        return data
    }
}

module.exports = Processor
