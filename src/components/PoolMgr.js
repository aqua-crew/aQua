const { Pool } = require('../models/index')

class PoolMgr {
    constructor() {
        this.recyclings = Object.create(null)
    }

    load(Recycling) {
        const name = Recycling.name
        this.recyclings[name] = Recycling
    }

    create(name) {
        const Recycling = this.recyclings[name]

        return new Pool(Recycling)
    }
}

module.exports = PoolMgr
