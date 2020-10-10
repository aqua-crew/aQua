const { Khala } = require('../utils/index')

class WorkerMgr {
    constructor(aqua) {
        this.aqua = aqua

        this.workersNameAndPath = []
        this.workers = Object.create(null)
        this.station = new Khala

        this.init()
    }

    init() {
        this.workers['highlight'] = new Worker('../workers/HighlightWorker.js')
        this.proxy('highlight', this.workers['highlight'])
    }

    get(name) {
        return this.workers[name]
    }

    proxy(name, worker) {
        worker.addEventListener('message', event => {
            this.station.emit(name, event.data)
        })
    }

    on(name, cb) {
        this.station.on(name, cb)
    }

    post(name, payload, cb) {
        this.get(name).postMessage(payload)
    }
}

module.exports = WorkerMgr
