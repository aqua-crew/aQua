module.exports = {
    binarySearch: function binarySearch(start, end, checkFn) {
        const center = parseInt((start + end) / 2)
        const result = checkFn(center)

        return result < 0 ? binarySearch(start, center, checkFn) :
            result > 0 ? binarySearch(center, end, checkFn) : center
    },
}
