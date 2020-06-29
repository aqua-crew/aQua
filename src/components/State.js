class State {
    constructor() {
        this.active = false,
        this.mousedown = false,

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
