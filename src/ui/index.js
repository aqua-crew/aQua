const { DOM, FnHelper } = require('../utils/index')

const e = FnHelper.getClosure(DOM, 'e')
const t = FnHelper.getClosure(DOM, 't')

module.exports = {
    /* Beacon Test Only */
    beacon: function(payload) {
        return e('div', {'class': 'aqua-beacon'})
    },

    /* Host */
    aqua: function(payload) {
        return e('div', {'class': 'aqua theme-aqua'})
    },

    /* Editor */
    editor: function(payload) {
        return e('div', {'class': 'aqua-editor'})
    },

    /* Viewport */
    viewport: function(payload) {
        return e('div', {'class': 'aqua-viewport'})
    },

    scroller: function(payload) {
        return e('div', {'class': 'aqua-scroller'})
    },

    /* Components Container */
    components: function(payload) {
        return e('div', {'class': 'aqua-components'})
    },

    fullWidthCntr: function(payload) {
        return e('div', {'class': 'full-width-container'})
    },

    lineWidthCntr: function(payload) {
        return e('div', {'class': 'line-width-container'})
    },

    /* Measures */
    measureCntr: function(payload) {
        return e('div', {'class': 'measure-container'})
    },

    lineNumMeasure: function(payload) {
        return e('div', {'class': 'line-num-measure'})
    },

    modsMeasure: function(payload) {
        return e('div', {'class': 'mods-measure'})
    },

    /* Container in Components Container */
    inputerCntr: function(payload) {
        return e('div', {'class': 'inputer-container'})
    },

    cursorCntr: function(payload) {
        return e('div', {'class': 'cursor-container'})
    },

    selectedCntr: function(payload) {
        return e('div', {'class': 'selected-container'})
    },

    selectionCntr: function(payload) {
        return e('div', {'class': 'selection-container'})
    },

    lineCntr: function(payload) {
        return e('div', {'class': 'line-container'})
    },

    /* Bg & Fg Container */
    bgCntr: function(payload) {
        return e('div', {'class': 'bg'})
    },

    fgCntr: function(payload) {
        return e('div', {'class': 'fg'})
    },

    /* Vital Components Children */
    inputerLocator: function(payload) {
        return e('div', {'class': 'inputer-locator'})
    },

    inputer: function(payload) {
        return (
            e('textarea', {'class': 'inputer',
                'autocomplete': 'off',  // 关闭自动补全提示, 防止出戏 (笑
                'autocapitalize': 'off', // 关闭首字母大写, 用于移动端
                'autocorrect': 'off', // 自动纠正
                'tabindex': '0', // 默认
                'wrap': 'off' // 关闭换行, 非标准内容, 所以在 css 还会冗余处理一次
            })
        )
    },
}
