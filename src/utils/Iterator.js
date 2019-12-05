module.exports = {
    iterate(obj, fn) {
        const keys = Object.keys(obj)

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            fn(obj[key], key)
        }
    },
}
