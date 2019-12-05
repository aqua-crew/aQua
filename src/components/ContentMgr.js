const { Content } = require('../models/index')
const { ContentType } = require('../enums/index')
const { DOM, SpeicalCharSet } = require('../utils/index')

class ContentMgr {
    constructor(aqua) {
        this.aqua = aqua
    }

    parse(raw, lang = this.aqua.state.mod.lang) {
        lang = this.aqua.langMgr.getLang(lang)

        return lang.parse(raw)
    }

    tokenize(contents, lang = this.aqua.state.mod.lang) {
        const tokens = []
        lang = this.aqua.langMgr.getLang(lang)

        contents.traverseAll(contentIns => {
            const type = contentIns.type
            if (type === ContentType.IMAGE) {
                tokens.push({
                    type: 'image',
                    value: contentIns.value,
                })
            } else if (type === ContentType.TEXT) {
                lang.tokenize(contentIns.value, tokens)
            }
        })

        return tokens
    }

    toElements(tokens) {
        const elements = []

        let $root = DOM.f()

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i]
            const type = token.type

            if (type === 'word') {
                const $child = DOM.e('span', {'class': 'aqua-block-' + token.type}, [DOM.t(token.value)])

                DOM.appendChild(
                    $root,
                    $child,
                )

                continue
            }

            if (type === 'newline') {
                elements.push($root)
                $root = DOM.f()

                continue
            }

            if (type === 'image') {
                const $child = DOM.e('img', {'class': 'aqua-block-' + token.type, 'src': token.value}, [DOM.t(token.value)])

                DOM.appendChild(
                    $root,
                    $child,
                )

                continue
            }

            const $child = DOM.t(token.value)

            DOM.appendChild(
                $root,
                $child,
            )

            // const $child = type === 'image' ? DOM.e('img', {'class': 'aqua-block-' + token.type, 'src': token.value}, [DOM.t(token.value)]) :
            //     type ? DOM.e('span', {'class': 'aqua-block-' + token.type}, [DOM.t(token.value)]) :

            // DOM.appendChild(
            //     $root,
            //     $child,
            // )

            // elements.push(this._toElements(tokens[i]))
        }

        return elements
    }

    _toElements(tokens) {
        const len = tokens.length
        const $root = DOM.f()

        if (len === 0) {
            DOM.appendChild(
                $root,
                DOM.e('span', {'class': 'aqua-block-empty'}, DOM.t(SpeicalCharSet.ZeroWidthSpace)),
            )
        }

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i]
            const type = token.type

            const $child = type === 'image' ? DOM.e('img', {'class': 'aqua-block-' + token.type, 'src': token.value}, [DOM.t(token.value)]) :
                type ? DOM.e('span', {'class': 'aqua-block-' + token.type}, [DOM.t(token.value)]) : DOM.t(token.value)

            DOM.appendChild(
                $root,
                $child,
            )
        }

        return $root
    }

    split(content, divider = '\n') {
        const result = []

        content.traverseAll(contentIns => {
            const type = contentIns.type

            if (type === ContentType.TEXT) {
                const contents = contentIns.value.split(divider)

                for (let i = 0; i < contents.length; i++) {
                    result.push(new Content({
                        value: contents[i]
                    }))
                }

                return
            }

            if (type === ContentType.IMAGE) {
                const imageContent = new Content({
                    value: contentIns.value,
                    type: contentIns.type,
                })

                result.length === 0 ? result.push(imageContent) : result[result.length - 1].next(imageContent)

                return
            }
        })

        return result
    }
}

module.exports = ContentMgr
