module.exports = {
    el: null,
    content: '',
    ext: 'txt', // extension: 'txt',

    ui: {
        theme: 'aqua',
        width: 'auto',
        height: 'auto',
        minHeight: '300',
        maxHeight: '1000',
        xOverflow: 'break', // 'scroll'
        yOverflow: 'scroll', // 'extend'

        background($ctnr, DOM) {},
        foreground($ctnr, DOM) {},
    },

    components: {
        scrollBar: true,
        minimap: true,
    },

    scroller: {

    },

    options: {
        readOnly: false,
        multipleCursors: true,
    },

    langs: {
        default: 'text',
        text: true,
        html: true,
        css: true,
        js: true,
    },

    line: {
        start: 1,
        height: 25,
    },

    lifetimes: {
        setup() {},
        ready() {},
        complete() {},
        destroyed() {},
    },

    plugins: [],
}
