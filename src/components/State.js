class State {
    constructor() {
        active: false,

        this.mod = {
            line: null,
            cursor: null,
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
