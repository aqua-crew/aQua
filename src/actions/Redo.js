const { Action } = require('../interfaces/index')

class Redo extends Action {
    constructor() {
        super()
        this.name = 'Redo'
        this.desc = 'Redo'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Ctrl + Y']
        this.record = false
    }

    exec(aqua, event) {
        event.preventDefault()

        aqua.chronicle.forward(macro => {
            if (!macro) {
                return
            }

            this.executeMicros(aqua, macro.micros)
        })
    }

    executeMicros(aqua, micros) {
        for (let i = 0; i < micros.length; i++) {
            const { source, start, end, contents } = micros[i].record

            if (source === 'write') {
                aqua.docMgr.write(contents, start)

                continue
            }

            if (source === 'delete') {
                aqua.docMgr.delete(start, end)

                continue
            }
        }
    }
}

module.exports = Redo
