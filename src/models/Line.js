const { ContentType } = require('../enums/index')

class Line {
    constructor({
        parent = null,
        content = null,
        height = 0,
        fold = false,
    } = {}) {
        this.parent = parent
        this.content = content
        this.height = height
        this.fold = fold
    }

    /**
     * @example
     * | 123456 |
     * - INSERT('111 \n 222 \n 333')->
     * | 123 | 111 |
     * | 222 |
     * | 333 | 456 |
     * 此时 firstContent 是 | 111 |, lastContent 是 | 333 |, 以便让原本段落的 | 456 | 拼接到 | 333 | 后面
     * @param  {Content} firstContent 插入时, 段落的第一行
     * @param  {Content} lastContent 插入时, 段落的最后一行
     * @param  {Content} x 插入的位置
     * @return {this}
     */
    insertContent(firstContent, lastContent, x) {
        const { content: targetContent, index } = this.content.search(x)

        let before = null
        let after = null

        if (index === 0) {
            before = targetContent.prev
            after = targetContent
        } else if (index === targetContent.currentSize()) {
            before = targetContent
            after = targetContent.next
        } else {
            const value = targetContent.value

            before = targetContent
            after = targetContent.clone()

            if (targetContent.type === ContentType.TEXT) {
                before.value = value.substring(0, index)
                after.value = value.substring(index, value.length)
            }
        }

        if (before === null) {
            firstContent.append(after)

            this.content = firstContent
        } else if (after === null) {
            before.append(firstContent)
        } else {
            before.insert(firstContent, null)
            lastContent.append(after)
        }

        return this
    }

    deleteContent(from = 0, end = 0) {
        const max = this.content.length
        const content = this.content
        const effect = end - from

        this.content = content.substring(0, start) + content.substring(end, max)

        return end - start
    }
}

module.exports = Line
