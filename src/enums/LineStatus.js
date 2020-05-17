module.exports = {
    DELETED: -1,

    HIDDEN: 0,

    CREATED: 1,
    DONE: 2,
    UPDATED: 3,

    explain(num) {
        if (num === -1) {
            return 'DELETED'
        }

        if (num === 0) {
            return 'HIDDEN'
        }

        if (num === 1) {
            return 'CREATED'
        }

        if (num === 2) {
            return 'DONE'
        }

        if (num === 3) {
            return 'UPDATED'
        }
    }
}
