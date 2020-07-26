class SimpleSet {
    constructor(arr = [], unique = Object.create(null)) {
        this.arr = arr
        this.unique = unique
    }

    add(name, payload) {
        const index = this.unique[name]

        if (index !== undefined) {
            this.arr[index] = null
        }

        this.unique[name] = this.arr.length

        this.arr.push({
            name,
            payload,
        })
    }

    use() {
        const arr = this.arr
        this.reset()

        return [arr, function(arr, cb) {
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i]

                if (item === null) {
                    continue
                }

                cb(item)
            }
        }]
    }

    reset() {
        this.unique = Object.create(null)
        this.arr = []
    }
}

module.exports = SimpleSet
