const { ContentType } = require('../enums/index')

class Content {
    constructor({
        value = '',
        type = ContentType.TEXT,
        next = null,
        prev = null,
    } = {}) {
        this.value = value
        this.type = type
        this.next = next
        this.prev = prev
    }

    setPrev(prev) {
        this.prev = prev
        prev && (prev.next = this)

        return prev
    }

    setNext(next) {
        this.next = next
        next && (next.prev = this)

        return next
    }

    insert(content, contentNext = this.next) {
        content.tail().setNext(contentNext)
        this.setNext(content)

        return this
    }

    append(content) {
        this.tail().setNext(content)

        return content
    }

    search(x) {
        let targetContent = null

        this.traverseAll(contentIns => {
            const type = contentIns.type
            const len = type === ContentType.TEXT ? contentIns.value.length : 1

            if (x <= len) {
                targetContent = contentIns

                return false
            }

            x = x - len
        })

        return {
            content: targetContent,
            index: x,
        }
    }

    currentSize() {
        const type = this.type

        if (type === ContentType.IMAGE) {
            return 1
        } else {
            return this.value.length
        }
    }

    size() {
        let effect = 0

        this.traverseAll(contentIns => {
            effect = effect + contentIns.currentSize()
        })

        return effect
    }

    traverse(cb) {
        if (this.next) {
            if (cb(this.next) === false) {
                return null
            }

            return this.next.traverse(cb)
        }

        return null
    }

    traverseAll(cb) {
        if (cb(this) === false) {
            return null
        }

        return this.traverse(cb)
    }

    clone() {
        return new Content({
            value: this.value,
            type: this.type,
            next: this.next,
            prev: this.prev,
        })
    }

    tail() {
        let tail = this

        this.traverse(contentIns => {
            tail = contentIns
        })

        return tail
    }
}

module.exports = Content
