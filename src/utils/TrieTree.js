const ConsumeCount = {
    Zero: 0,
    Part: 1,
    All: 2,
}

const EndOfWord = true
const NotEndOfWord = false

class TrieNode {
    constructor(value = null, isEnd = null, children = []) {
        this.value = value
        this.isEnd = isEnd
        this.children = children
    }

    /**
     * 消耗 str
     * @param  {[type]} str [需要消耗的字符串]
     * @return {Array<Number, TrieNode, ConsumeCount>}     [[str 消耗的字符, 消耗字符的节点, 消耗字符的节点的消耗字符的数量的类型]]
     */
    consume(str) {
        let targetNode = null
        let targetValue = ''
        const children = this.children

        for (let i = 0; i < children.length; i++) {
            const child = children[i]
            const childValue = child.value

            if (childValue[0] === str[0]) {
                targetNode = child
                targetValue = childValue

                break
            }
        }

        if (!targetNode) {
            return [0, this, ConsumeCount.Zero]
        }

        let pointer = 0
        for (; pointer < targetValue.length; pointer++) {
            if (targetValue[pointer] !== str[pointer]) {
                return [pointer, targetNode, ConsumeCount.Part]
            }
        }

        return [pointer, targetNode, ConsumeCount.All]
    }
}

class TrieTree {
    constructor(strs) {
        this.root = new TrieNode
    }

    addAsArray(strArr) {
        for (let i = 0; i < strArr.length; i++) {
            this.add(strArr[i])
        }
    }

    /**
     * 添加一个 String 到该树中
     */
    add(str) {
        if (str.length < 1) {
            return
        }

        const strLength = str.length
        let currentStr = str

        for (let strPointer = 0, currentNode = this.root; currentNode != null;) {
            const [move, nextNode, consumedCountType] = currentNode.consume(currentStr)

            if (consumedCountType === ConsumeCount.Zero) {
                nextNode.children.push(new TrieNode(currentStr, EndOfWord))

                return
            }

            const nextNodeValue = nextNode.value

            if (consumedCountType === ConsumeCount.Part) {
                nextNode.children = [new TrieNode(nextNodeValue.substring(move, nextNodeValue.length), EndOfWord, nextNode.children)]
                nextNode.value = nextNodeValue.substring(0, move)
                nextNode.isEnd = NotEndOfWord
            }

            strPointer = strPointer + move

            if (strPointer === strLength) {
                nextNode.isEnd = EndOfWord

                return
            }

            currentStr = str.substring(strPointer, strLength)
            currentNode = nextNode
        }
    }

    /**
     * 查找 str 为前缀的所有 word
     * @param  {String} str [需要查找的前缀]
     * @return {Array<String>}
     */
    startsWith(str = '') {
        let prefix = ''
        let currentStr = str
        let targetNode = null

        let isTerminate = true

        outer: for (let currentNode = this.root; currentNode.children.length !== 0;) {
            const children = currentNode.children

            inner: for (let i = 0; i < children.length; i++) {
                const nextNode = children[i]
                const nextNodeValue = nextNode.value
                const nextNodeValueLength = nextNodeValue.length

                if (currentStr.length <= nextNodeValueLength) {
                    // 成功匹配, 直接退出
                    if (nextNodeValue.startsWith(currentStr)) {
                        targetNode = nextNode

                        break outer
                    }

                    // 匹配失败, 尝试下一个
                    continue
                }

                if (!currentStr.startsWith(nextNodeValue)) {
                    // 匹配失败, 尝试下一个
                    continue
                }

                // 匹配成功了前缀的一部分, 替换 currentNode 为匹配成功的 nextNode
                currentNode = nextNode
                currentStr = currentStr.substring(nextNodeValueLength)
                prefix = prefix + nextNodeValue

                // 如果走完了循环依然没有匹配到部分前缀, 或者全部前缀, 那么就是匹配失败
                // 这里为了绕过这个逻辑, 使用了一个标识
                isTerminate = false

                break inner
            }

            if (isTerminate) {
                return []
            } else {
                isTerminate = true
            }
        }

        // 如果树内没有任何节点
        if (!targetNode) {
            return []
        }

        return this.collect(targetNode, prefix)
    }

    /**
     * 收集一个节点下的所有 word
     * @param  {TrieNode} trieNode [需要收集的节点]
     * @param  {String} prefix   [需要加上的前缀]
     * @return {Array<String>}
     */
    collect(trieNode = this.root, prefix = '') {
        const collectWord = function collectWord(trieNode, prefix, collector) {
            prefix = prefix + trieNode.value

            if (trieNode.isEnd) {
                collector.push(prefix)
            }

            const children = trieNode.children

            for (let i = 0; i < children.length; i++) {
                collectWord(children[i], prefix, collector)
            }

            return collector
        }

        return collectWord(trieNode, prefix, [])
    }
}

module.exports = TrieTree
