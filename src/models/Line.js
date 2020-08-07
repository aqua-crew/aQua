const { StringAsset } = require('../assets/index')
const { LineStatus } = require('../enums/index')

class Line {
    constructor({
        height = 0,
        data = '',
        status = LineStatus.CREATED,
        parent = null,
    } = {}) {
        this._height = 0
        this._heightBuffer = 0

        this.height = height
        this.data = data
        this.status = status
        this.parent = parent
    }

    get id() {
        if (this._id) {
            return this._id
        }

        return this._id = 'L' + (new Date().getTime() + Math.random()).toString(36).replace('.', '')
    }

    set height(height) {
        this._heightBuffer = this._heightBuffer + (height - this._height)
        this._height = height
    }

    get height() {
        return this._height
    }

    get length() {
        if (typeof this.data === 'string') {
            return this.data.length
        }

        let sum = 0

        this.traverse(asset => {
            sum = sum + asset.length
        })

        return sum
    }

    static setStatus(lines, status) {
        if (Array.isArray(lines)) {
            for (let i = 0; i < lines.length; i++) {
                lines[i].setStatus(status)
            }

            return
        }

        lines.setStatus(status)
    }

    /**
     * 批量转化 data 数组中的 start 到 end 之间为 Line Instance
     * @param  {Array}  data
     * @param  {Number} start
     * @param  {Number} end
     * @return {Array<Line>}
     */
    static toInstances(data = [], start = 0, end = data.length) {
        const instances = []

        for (let i = start; i < end; i++) {
            instances.push(new Line({
                data: data[i],
            }))
        }

        return instances
    }

    /**
     * 1. 由于是小于等于，理论上每个 Asset 链的除了第一个块，返回的 index 不会为 0
     * @param  {number} x
     * @return {{ asset: this, index: x }}
     */
    search(x) {
        let result = null

        this.traverse(asset => {
            const len = asset.length

            /* 1 */
            if (x <= len) {
                result = { asset, index: x }

                return false
            }

            if (!asset.next) {
                result = { asset, index: len }

                return false
            }

            x = x - len
        })

        return result
    }

    /**
     * 1. 当 x 为 0 直接插入头部，避免在 Asset 内部处理 Line.prototype.data 的头部指向
     * @param  {String || Asset}
     * @param  {Number} x
     */
    write(content, x = this.length) {
        if (content.length === 0) {
            return
        }

        this.setStatus(LineStatus.UPDATED)

        const dataType = typeof this.data
        const contentType = typeof content

        if (dataType === 'string') {
            if (contentType === 'string') {
                this.data = this.data.substring(0, x) + content + this.data.substring(x, this.length)
            } else {
                /* 1 */
                if (x === 0) {
                    content.setTail(new StringAsset(this.data))
                    this.data = content
                } else {
                    this.data = new StringAsset(this.data)
                    const { asset, index } = this.search(x)

                    asset.insert(content, index)
                }
            }
        } else {
            if (contentType === 'string') {
                content = new StringAsset(content)
            }

            /* 1 */
            if (x === 0) {
                content.setTail(this.data)
                this.data = content
            } else {
                const { asset, index } = this.search(x)
                asset.insert(content, index)
            }
        }
    }

    /**
     * 1. 从 start 开始的 asset 开始截取
     * @param  {Number} start
     * @param  {Number} end
     * @return {String || Asset}
     */
    delete(start = 0, end = this.length) {
        if (start === end) {
            return ''
        }

        this.setStatus(LineStatus.UPDATED)

        if (typeof this.data === 'string') {
            const deletedData = this.data.substring(start, end)
            this.data = this.data.substring(0, start) + this.data.substring(end, this.length)

            return deletedData
        }

        if (start === 0 && end === this.length) {
            const deletedData = this.data
            this.data = ''

            return deletedData
        }

        ({ start, end, asset } = this._transformXs(start, end))

        const len = asset.length

        if (end <= len) {
            const deletedData = asset.delete(start, end)
            this._removeEmpty(asset)

            return deletedData
        }

        let deletedData = asset.delete(start, len)
        end = end - len

        const head = deletedData
        /* 2 -> */

        this.traverse(asset => {
            const len = asset.length

            if (end > len) {
                deletedData = deletedData.setNext(asset.delete(0, len))
            } else {
                deletedData = deletedData.setNext(asset.delete(0, end))

                return false
            }

            end = end - len
        }, asset.next)

        this._removeEmpty(asset)

        return head
    }

    /**
     * 1. 从 start 开始的 asset 开始截取
     * 2. 因为需要返回一个链的 head, 所以预先处理第一个 asset 来保存 head
     * @param  {Number} start
     * @param  {Number} end
     * @return {String || Asset}
     */
    read(start = 0, end = this.length) {
        if (start === end) {
            return ''
        }

        if (typeof this.data === 'string') {
            return this.data.substring(start, end)
        }

        /* 1 */
        ({ start, end, asset } = this._transformXs(start, end))

        /* <- 2 */
        const len = asset.length

        if (end <= len) {
            return asset.get(start, end)
        }

        let data = asset.get(start, len)
        end = end - len

        const head = data
        /* 2 -> */

        this.traverse(asset => {
            const len = asset.length

            if (end > len) {
                data = data.setNext(asset.get(0, len))
            } else {
                data = data.setNext(asset.get(0, end))

                return false
            }

            end = end - len
        }, asset.next)

        return head
    }

    traverse(cb, data = this.data) {
        for (let asset = data; asset !== null; asset = asset.next) {
            if (cb(asset) === false) {
                return
            }
        }

        return
    }

    setStatus(status) {
        if (status === LineStatus.CREATED) {
            return
        }

        if (this.status === LineStatus.CREATED && status === LineStatus.UPDATED) {
            return
        }

        this.status = status
    }

    release() {
        this.setStatus(LineStatus.DELETED)
    }

    isAlive() {
        return this.status > 1
    }

    isDeleted() {
        return this.status === LineStatus.DELETED
    }

    isHidden() {
        return this.status === LineStatus.HIDDEN
    }

    isCreated() {
        return this.status === LineStatus.CREATED
    }

    isDone() {
        return this.status === LineStatus.DONE
    }

    isUpdated() {
        return this.status === LineStatus.UPDATED
    }

    toString() {
        if (typeof this.data === 'string') {
            return this.data
        }

        let str = ''

        this.traverse(asset => {
            str = str + asset.toString()
        })

        return str
    }

    flushHeightBuffer() {
        const buffer = this._heightBuffer
        this._heightBuffer = 0

        return buffer
    }

    requestLineNum() {
        return this.parent.children.indexOf(this) + this._requestLineNum(this.parent)
    }

    _requestLineNum(obj) {
        if (!obj.parent) {
            return 0
        }

        const children = obj.parent.children
        const index = children.indexOf(obj)

        let size = 0

        for (let i = 0; i < index; i++) {
            size = size + children[i].size
        }

        return size + this._requestLineNum(obj.parent)
    }

    /**
     * 找到 start 对应的 asset
     * @param  {Number} start
     * @param  {Number} end
     * @param  {Asset} startAsset
     * @return {start<Number>, end<Number>, asset<Asset>}
     */
    _transformXs(start, end, startAsset = this.data) {
        let result = null

        if (start === 0) {
            return {
                start,
                end,
                asset: startAsset,
            }
        }

        this.traverse(asset => {
            const len = asset.length

            if (start >= len) {
                start = start - len
                end = end - len

                return
            }

            result = {
                start: (start === 0 && !asset.next) ? start : start,
                end,
                asset,
            }

            return false
        }, startAsset)

        if (!result) {
            const len = this.length

            result = {
                start: len,
                end: len,
                asset: this.data.tail,
            }
        }

        // console.error(result)
        return result
    }

    _removeEmpty(startAsset = this.data) {
        this.traverse(asset => {
            if (asset.isEmpty()) {
                return
            }

            startAsset.setNext(asset)

            return false
        }, startAsset.next)

        if (startAsset.isEmpty()) {
            if (startAsset === this.data) {
                this.data = startAsset.next || ''
                startAsset.next && startAsset.next.setPrev(null)
            } else {
                startAsset.prev.setNext(startAsset.next)
            }
        }
    }
}

module.exports = Line
