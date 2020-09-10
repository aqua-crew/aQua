const { rAF, DOM } = require('../utils/index')
const { CatalogueNodeType } = require('../enums/index')

const Template = {
    [CatalogueNodeType.Project](node) {
        return DOM.e('div', {'class': 'aqua-menu-level-1'}, [
            DOM.e('div', {'class': 'aqua-menu-item'}, [
                DOM.e('i', {'class': 'aqua-icon aqua-icon-project'}),
                DOM.e('span', {'class': 'aqua-name'}, node.filename),
            ])
        ])
    },

    [CatalogueNodeType.Folder](node) {
        return DOM.e('li', {'class': 'aqua-menu-level-2'}, [
            DOM.e('div', {'class': 'aqua-menu-item'}, [
                DOM.e('i', {'class': 'aqua-icon aqua-icon-folder'}),
                DOM.e('span', {'class': 'aqua-name'}, node.filename),
            ])
        ])
    },

    [CatalogueNodeType.File](node) {
        return DOM.e('li', {'class': 'aqua-menu-level-2'}, [
            DOM.e('div', {'class': 'aqua-menu-item'}, [
                DOM.e('i', {'class': `aqua-icon aqua-icon-${node.ext || 'empty'}`}),
                DOM.e('span', {'class': 'aqua-name'}, node.filename),
            ])
        ])
    },

    list() {
        return DOM.e('ul', {'class': 'aqua-menu-list'})
    }
}

class DetailBarRenderer {
    constructor(aqua) {
        this.applyName = 'detailBar'

        this.$detailBar = aqua.uiMgr.get('detailBar')
    }

    render(catalogues) {
        DOM.appendChild(this.$detailBar, this.build(catalogues))
    }

    build(catalogues, $mountpoint = DOM.f(), recursion = true) {
        for (let i = 0; i < catalogues.length; i++) {
            const node = catalogues[i]

            switch(node.type) {
                case CatalogueNodeType.File:
                    DOM.appendChild($mountpoint, Template[node.type](node))

                    break

                case CatalogueNodeType.Project:
                case CatalogueNodeType.Folder:
                    const $node = Template[node.type](node)
                    DOM.appendChild($mountpoint, $node)

                    if (recursion && node.children && node.children.length > 0) {
                        const $children = Template['list']()
                        DOM.appendChild($node, $children)

                        this.build(node.children, $children, recursion)
                    }

                    break
            }
        }

        return $mountpoint
    }
}

module.exports = DetailBarRenderer
