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

        const cursors = macro.after
        const creator = aqua.cursorMgr.useCreator()

        for (let i = 0; i < cursors.length; i++) {
            const after = cursors[i]

            creator.create(cursor => {
                cursor.y = after.y
                cursor.x = after.x
            })
        }

        creator.finish()
    }
}

module.exports = Redo
