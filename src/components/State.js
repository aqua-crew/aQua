class State {
    constructor() {
        this.mod = {
            line: null,
            cursor: null,
            lang: null,
        }

        this.aqua = {
            active: false,
        }

        this.ui = {
            resized: false,
        }
    }
}

module.exports = State
