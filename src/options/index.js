module.exports = {
    el: null,
    content: '',

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
        mounted() {},
        ready() {},
        beforeDestroy() {},
        destroyed() {},
    },

    plugins: [],
}
