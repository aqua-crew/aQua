const { CatalogueNodeType } = require('../enums/index')
const { CatalogueNode } = require('../models/index')

const Aqua = new CatalogueNode({
    name: 'aQua',
    type: CatalogueNodeType.Project,
    src: '\'',
    children: [
        new CatalogueNode({
            name: 'benchmark',
            type: CatalogueNodeType.Folder,
        }),
        new CatalogueNode({
            name: 'docs',
            type: CatalogueNodeType.Folder,
            children: [
                new CatalogueNode({
                    name: 'images',
                    type: CatalogueNodeType.Folder,
                    children: [
                        new CatalogueNode({
                            name: 'aqua-chan',
                            type: CatalogueNodeType.File,
                            ext: 'png',
                        }),
                        new CatalogueNode({
                            name: 'aqua-eat',
                            type: CatalogueNodeType.File,
                            ext: 'jpg',
                        }),
                        new CatalogueNode({
                            name: 'aqua-gun',
                            type: CatalogueNodeType.File,
                            ext: 'gif',
                        }),
                    ],
                }),
                new CatalogueNode({
                    name: 'src',
                    type: CatalogueNodeType.Folder,
                    children: [
                        new CatalogueNode({
                            name: 'index',
                            type: CatalogueNodeType.File,
                            ext: 'js',
                        })
                    ],
                })
            ],
        }),
        new CatalogueNode({
            name: '.editorconfig',
            type: CatalogueNodeType.File,
        }),
        new CatalogueNode({
            name: 'LICENSE',
            type: CatalogueNodeType.File,
        }),
        new CatalogueNode({
            name: 'index',
            type: CatalogueNodeType.File,
            ext: 'js',
        }),
    ],
})

class DetailBarMgr {
    constructor(aqua, catalogue = []) {
        this.aqua = aqua
        this.renderer = aqua.renderer

        this.catalogue = catalogue
    }

    init() {
        this.aqua.renderer.render('detailBar', [Aqua])
    }
}

module.exports = DetailBarMgr
