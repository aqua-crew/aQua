class State {
    constructor() {
        this.mod = {
            line: null,
            cursor: null,
        }

        this.aqua = {
            active: false,
        }

        this.file = {
            suffix: 'txt',
        }

        this.ui = {
            resized: false,
        }
    }
}

module.exports = State
