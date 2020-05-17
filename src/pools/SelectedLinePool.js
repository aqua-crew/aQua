const { Pool } = require('../interfaces/index')

class SelectedLinePool extends Pool {
    constructor(Recycle) {
        super()
        this.Recycle = Recycle
    }
}

module.exports = SelectedLinePool
