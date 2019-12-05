class LangMgr {
    constructor(aqua) {
        this.aqua = aqua

        this.langs = Object.create(null)
    }

    load(Lang) {
        const lang = new Lang
        const alias = lang.alias
        alias.push(lang.name)

        if (!this.aqua.state.mod.lang) {
            this.aqua.state.mod.lang = lang
        }

        for (let i = 0; i < alias.length; i++) {
            const name = lang.caseSensitive ? alias[i] : alias[i].toLowerCase()
            this.set(name, lang)
        }
    }

    parse(content, lang = this.aqua.state.mod.lang) {
        lang = this.getLang(lang)

        return lang.parse(content)
    }

    /* Rare */
    set(name, lang, langs = this.langs) {
        langs[name] = lang
    }

    getLang(name) {
        if (typeof name !== 'string') {
            return name
        }

        const firstTry = this.langs[name]

        if (firstTry) {
            return firstTry
        }

        const secondTry = this.langs[name.toLowerCase()]

        if (!secondTry || secondTry.caseSensitive) {
            console.error(`Lang ${name} not exist`)

            return null
        }

        return secondTry
    }
}

module.exports = LangMgr
