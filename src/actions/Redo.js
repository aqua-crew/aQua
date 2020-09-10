const { Action } = require('../interfaces/index')

class Redo extends Action {
    constructor() {
        super()
        this.name = 'Redo'
        this.shortcuts = ['Ctrl + Y']
        this.record = false
    }

    exec(aqua, event) {
        event.preventDefault()

        aqua.chronicle.forward(macro => {
            if (!macro) {
                return
            }

            this.redo(aqua, macro)
        })
    }

    redo(aqua, macro) {
        const micros = macro.micros

        for (let i = 0; i < micros.length; i++) {
            const { source, start, end, contents } = micros[i].record

            if (source === 'write') {
                aqua.docMgr.write(contents, start, {
                    track: false,
                })

                continue
            }

            if (source === 'delete') {
                aqua.docMgr.delete(start, end, {
                    track: false,
                })

                continue
            }
        }

        aqua.cursorMgr.rebuild(macro.after)
    }
}

module.exports = Redo
