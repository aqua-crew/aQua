const { Action } = require('../interfaces/index')

class Undo extends Action {
    constructor() {
        super()
        this.name = 'Undo'
        this.desc = 'Undo'
        this.cmd = null
        this.icons = null
        this.shortcuts = ['Ctrl + Z']
        this.record = false
    }

    exec(aqua, event) {
        event.preventDefault()

        aqua.chronicle.back(macro => {
            if (!macro) {
                return
            }

            this.undo(aqua, macro)
        })
    }

    undo(aqua, macro) {
        const micros = macro.micros

        for (let i = micros.length - 1; i >= 0; i--) {
            const { source, start, end, contents } = micros[i].record

            if (source === 'write') {
                aqua.docMgr.delete(start, end, {
                    track: false,
                })

                continue
            }

            if (source === 'delete') {
                aqua.docMgr.write(contents, start, {
                    track: false,
                })

                continue
            }
        }

        const cursors = macro.before
        const creator = aqua.cursorMgr.useCreator()

        for (let i = 0; i < cursors.length; i++) {
            const before = cursors[i]

            creator.create(cursor => {
                cursor.y = before.y
                cursor.x = before.x
            })
        }

        creator.finish()
    }
}

module.exports = Undo
