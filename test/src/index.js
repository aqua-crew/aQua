const Aqua = require('../../index')
const AquaHeart = require('../plugins/AquaHeart')

const content =
`Aqua Ch. 湊あくあ

直播时间：4小时前
人生二回目のサクセス！
最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して
▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁
湊あくあ10万人記念ボイス販売がいよいよスタート！
みんな、もう聞いてくれたかな？？？くれたかな！？
ほんっとに一生懸命考えたから、聞いてくれると嬉しいなぁ・・・

【⇩購入場所はこちら】
国内の方→https://hololive.booth.pm/items/1449313
海外の方→https://www.geekjack.net/cover/langua...

感想は　#湊あくあ10万人記念ボイス　まで！

グッズイラストを担当してくださった
やすゆきせんせえのTwitter➡https://twitter.com/yasu00kamiki
▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁

⚓バーチャルメイド、湊あくあ（Minato Aqua）です。
おかげさまでチャンネル登録者数が100000人を突破しました！！！

いつも見てくださる皆様ホントにありがとうございます！
これからも頑張るので応援よろしくおねがいします！
Aqua Ch. 湊あくあ

直播时间：4小时前
人生二回目のサクセス！
最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して最強のホームラン王を目指して
▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁
湊あくあ10万人記念ボイス販売がいよいよスタート！
みんな、もう聞いてくれたかな？？？くれたかな！？
ほんっとに一生懸命考えたから、聞いてくれると嬉しいなぁ・・・

【⇩購入場所はこちら】
国内の方→https://hololive.booth.pm/items/1449313
海外の方→https://www.geekjack.net/cover/langua...

感想は　#湊あくあ10万人記念ボイス　まで！

グッズイラストを担当してくださった
やすゆきせんせえのTwitter➡https://twitter.com/yasu00kamiki
▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁

⚓バーチャルメイド、湊あくあ（Minato Aqua）です。
おかげさまでチャンネル登録者数が100000人を突破しました！！！

いつも見てくださる皆様ホントにありがとうございます！
これからも頑張るので応援よろしくおねがいします！`

const aqua = new Aqua({
    el: document.getElementById('editor'),
    content,

    ui: {
        theme: 'aqua',
        width: 'auto',
        height: 'auto',
        minHeight: '300',
        maxHeight: '1000',
        xOverflow: 'break', // 'scroll'
        yOverflow: 'scroll', // 'extend'

        background($ctnr, DOM) {
            console.error('set bg', arguments)
        },

        foreground($ctnr, DOM) {
            console.error('set bg', arguments)
        },
    },

    options: {
        readOnly: false,
        multipleCursors: true,
    },

    langs: {
        default: 'text',
        text: true,
    },

    line: {
        start: 1,
        height: 25,
    },

    lifetimes: {
        setup() {},
        mounted() {},
        ready() {},
        destroyed() {},
    },

    plugins: {
        AquaHeart
    },
})
