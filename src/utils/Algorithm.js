module.exports = {
    binarySearch: function binarySearch(start, end, checkFn, lastCenter = -1) {
        const center = parseInt((start + end) / 2)
        const result = checkFn(center, lastCenter)

        return result < 0 ? binarySearch(start, center, checkFn, center) :
            result > 0 ? binarySearch(center, end, checkFn, center) : center
    },
}
