const { DOM } = require('../utils/index')

module.exports = {
    /* Host */
    aqua: function() {
        return DOM.e('div', {'class': 'aqua theme-aqua'})
    },

    /* Editor */
    editor: function() {
        return DOM.e('div', {'class': 'aqua-editor'})
    },

    /* Viewport */
    viewport: function() {
        return DOM.e('div', {'class': 'aqua-viewport'})
    },

    scroller: function() {
        return DOM.e('div', {'class': 'aqua-scroller'})
    },

    /* Components Container */
    components: function() {
        return DOM.e('div', {'class': 'aqua-components aqua-variables'})
    },

    fullWidthCntr: function() {
        return DOM.e('div', {'class': 'full-width-container'})
    },

    lineWidthCntr: function() {
        return DOM.e('div', {'class': 'line-width-container'})
    },

    /* Fixed */
    fixed: function() {
        return DOM.e('div', {'class': 'aqua-fixed'})
    },

    sideBarCntr: function() {
        return DOM.e('div', {'class': 'side-bar-container'})
    },

    minimap: function() {
        return DOM.e('div', {'class': 'aqua-minimap'})
    },

    scrollBar: function() {
        return DOM.e('div', {'class': 'aqua-scroll-bar'}, [
            DOM.e('div', {'class': 'aqua-slider'}),
        ])
    },

    /* Measurers */
    measurerCntr: function() {
        return DOM.e('div', {'class': 'measurer-container'})
    },

    ramMeasurer: function() {
        return DOM.e('div', {'class': 'ram-measurer'})
    },

    lineMeasurer: function() {
        return DOM.e('div', {'class': 'line-measurer'})
    },

    remMeasurer: function() {
        return DOM.e('div', {'class': 'rem-measurer'})
    },

    /* Container in Components Container */
    inputerCntr: function() {
        return DOM.e('div', {'class': 'inputer-container'})
    },

    cursorCntr: function() {
        return DOM.e('div', {'class': 'cursor-container'})
    },

    selectedLineCntr: function() {
        return DOM.e('div', {'class': 'selected-line-container'})
    },

    selectionCntr: function() {
        return DOM.e('div', {'class': 'selection-container'})
    },

    lineCntr: function() {
        return DOM.e('div', {'class': 'line-container'})
    },

    /* Bg & Fg Container */
    bgCntr: function() {
        return DOM.e('div', {'class': 'bg'})
    },

    fgCntr: function() {
        return DOM.e('div', {'class': 'fg'})
    },

    /* Vital Components Children */
    inputerLocator: function() {
        return DOM.e('div', {'class': 'inputer-locator'})
    },

    inputer: function() {
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
