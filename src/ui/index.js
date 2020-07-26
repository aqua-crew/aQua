const { DOM } = require('../utils/index')

module.exports = {
    /* Host */
    aqua() {
        return DOM.e('div', {'class': 'aqua theme-aqua'})
    },

    /* Editor */
    editor() {
        return DOM.e('div', {'class': 'aqua-editor'})
    },

    /* Viewport */
    viewport() {
        return DOM.e('div', {'class': 'aqua-viewport'})
    },

    scroller() {
        return DOM.e('div', {'class': 'aqua-scroller'})
    },

    /* Components Container */
    components() {
        return DOM.e('div', {'class': 'aqua-components aqua-variables'})
    },

    fullWidthCntr() {
        return DOM.e('div', {'class': 'full-width-container'})
    },

    lineWidthCntr() {
        return DOM.e('div', {'class': 'line-width-container'})
    },

    /* Fixed */
    fixed() {
        return DOM.e('div', {'class': 'aqua-fixed'})
    },

    sideBarCntr() {
        return DOM.e('div', {'class': 'side-bar-container'})
    },

    minimap() {
        return DOM.e('div', {'class': 'aqua-minimap'})
    },

    scrollBar() {
        return DOM.e('div', {'class': 'aqua-scroll-bar'}, [
            DOM.e('div', {'class': 'aqua-slider'}),
        ])
    },

    /* Measurers */
    measurerCntr() {
        return DOM.e('div', {'class': 'measurer-container'})
    },

    ramMeasurer() {
        return DOM.e('div', {'class': 'ram-measurer'})
    },

    lineMeasurer() {
        return DOM.e('div', {'class': 'line-measurer'})
    },

    remMeasurer() {
        return DOM.e('div', {'class': 'rem-measurer'})
    },

    /* Container in Components Container */
    inputerCntr() {
        return DOM.e('div', {'class': 'inputer-container'})
    },

    cursorCntr() {
        return DOM.e('div', {'class': 'cursor-container'})
    },

    selectedLineCntr() {
        return DOM.e('div', {'class': 'selected-line-container'})
    },

    selectionCntr() {
        return DOM.e('div', {'class': 'selection-container'})
    },

    lineCntr() {
        return DOM.e('div', {'class': 'line-container'})
    },

    /* Bg & Fg Container */
    bgCntr() {
        return DOM.e('div', {'class': 'aqua-bg'})
    },

    fgCntr() {
        return DOM.e('div', {'class': 'aqua-fg'})
    },

    /* Vital Components Children */
    inputerLocator() {
        return DOM.e('div', {'class': 'inputer-locator'})
    },

    inputer() {
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
