class Echo {
    constructor() {

    }

    error(errorType, msg) {
        console.error(`${errorType}: ${msg}`)
    }
}

module.exports = Echo
