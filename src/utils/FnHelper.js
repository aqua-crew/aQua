const FnHelper = {
    getClosure(obj, fn) {
        return obj[fn].bind(obj)
    },
}

module.exports = FnHelper
