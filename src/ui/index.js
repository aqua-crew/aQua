const { DOM } = require('../utils/index')

module.exports = {
    /* Beacon Test Only */
    beacon: function(payload) {
        return DOM.e('div', {'class': 'aqua-beacon'})
    },

    /* Host */
    aqua: function(payload) {
        return DOM.e('div', {'class': 'aqua theme-aqua'})
    },

    /* Editor */
    editor: function(payload) {
        return DOM.e('div', {'class': 'aqua-editor'})
    },

    /* Viewport */
    viewport: function(payload) {
        return DOM.e('div', {'class': 'aqua-viewport'})
    },

    scroller: function(payload) {
        return DOM.e('div', {'class': 'aqua-scroller'})
    },

    /* Components Container */
    components: function(payload) {
        return DOM.e('div', {'class': 'aqua-components'})
    },

    fullWidthCntr: function(payload) {
        return DOM.e('div', {'class': 'full-width-container'})
    },

    lineWidthCntr: function(payload) {
        return DOM.e('div', {'class': 'line-width-container'})
    },

    /* Measures */
    measureCntr: function(payload) {
        return DOM.e('div', {'class': 'measure-container'})
    },

    lineNumMeasure: function(payload) {
        return DOM.e('div', {'class': 'line-num-measure'})
    },

    modsMeasure: function(payload) {
        return DOM.e('div', {'class': 'mods-measure'})
    },

    /* Container in Components Container */
    inputerCntr: function(payload) {
        return DOM.e('div', {'class': 'inputer-container'})
    },

    cursorCntr: function(payload) {
        return DOM.e('div', {'class': 'cursor-container'})
    },

    selectedLineCntr: function(payload) {
        return DOM.e('div', {'class': 'selected-line-container'})
    },

    selectionCntr: function(payload) {
        return DOM.e('div', {'class': 'selection-container'})
    },

    lineCntr: function(payload) {
        return DOM.e('div', {'class': 'line-container'})
    },

    /* Bg & Fg Container */
    bgCntr: function(payload) {
        return DOM.e('div', {'class': 'bg'})
    },

    fgCntr: function(payload) {
        return DOM.e('div', {'class': 'fg'})
    },

    /* Vital Components Children */
    inputerLocator: function(payload) {
        return DOM.e('div', {'class': 'inputer-locator'})
    },

    inputer: function(payload) {
        return (
            DOM.e('textarea', {'class': 'inputer',
                'autocomplete': 'off',  // 关闭自动补全提示, 防止出戏 (笑
                'autocapitalize': 'off', // 关闭首字母大写, 用于移动端
                'autocorrect': 'off', // 自动纠正
                'tabindex': '0', // 默认
                'wrap': 'off' // 关闭换行, 非标准内容, 所以在 css 还会冗余处理一次
            })
        )
    },
}
