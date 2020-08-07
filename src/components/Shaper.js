const ShapingMap = {
    cursor: {
        decompose(aqua, cursors) {
            const data = Object.create(null)

            data.coord = cursor.coord.extact()
            data.selection = cursor.selection.extract()
        },

        compose(aqua, data) {
            const creator = aqua.cursorMgr.useCreator()
        },
    }
}

/**
 * 用来将一个 Model 分解成仅数据的形式或将数据重组成 Model 的形式
 */
class Shaper {
    constructor(aqua) {
        this.aqua = aqua
        this.map = ShapingMap
    }

    decompose(type = '', ...payload) {
        const shape = this.map[type]

        shape && shape.decompose(aqua, ...payload)
    }

    compose(type = '', ...payload) {
        const shape = this.map[type]

        shape && shape.compose(aqua, ...payload)
    }
}

module.exports = Shaper
