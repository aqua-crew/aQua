module.exports = {
    create(node, start, end) {
        const range = document.createRange()

        range.setStart(node, start)
        range.setEnd(node, end)

        return range
    }
}
