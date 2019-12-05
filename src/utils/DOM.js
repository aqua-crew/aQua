module.exports = {
    e(tag, props = null, children = []) {
        const node = document.createElement(tag)

        if (props) {
            const keys = Object.keys(props)
            let key
            for (let i = 0; i < keys.length; i++) {
                key = keys[i]
                node.setAttribute(key, props[key])
            }
        }

        this.appendChild(node, children)

        return node
    },

    t(content) {
        return document.createTextNode(content)
    },

    f() {
        return document.createDocumentFragment()
    },

    appendChild(parent, children, startFrom = Infinity) {
        const existChildren = parent.children
        const existChildrenLen = existChildren.length

        if (startFrom > existChildrenLen || existChildrenLen === 0) {
            return this._appendChild(parent, children)
        }

        const anchor = existChildren[startFrom]
        return this._insertChild(parent, children, anchor)
    },

    replaceChild(parent, newChild, oldChild) {
        return parent.replaceChild(newChild, oldChild)
    },

    removeChild(parent, children) {
        return parent.removeChild(children)
    },

    _appendChild(parent, children) {
        return parent.appendChild(this._toFragment(children))
    },

    _insertChild(parent, children, anchor) {
        return parent.insertBefore(children, anchor)
    },

    _toFragment(eles) {
        const $f = this.f()

        if (Array.isArray(eles)) {
            for (let i = 0; i < eles.length; i++) {
                $f.appendChild(eles[i])
            }
        } else {
            $f.appendChild(eles)
        }

        return $f
    },
}
