class Marker {
    constructor(marks = Object.create(null)) {
        this.marks = marks
    }

    load(name, mark) {
        let onUse = null

        if (mark.once) {
            if (mark.nextTick) {
                onUse = (obj, name, ...payload) => {
                    const result = mark.effect(...payload)

                    setTimeout(() => {
                        obj[name] = false
                    })

                    return result
                }
            } else {
                onUse = (obj, name, ...payload) => {
                    const result = mark.effect(...payload)

                    obj[name] = false

                    return result
                }
            }
        } else {
            if (isNaN(mark.hp)) {
                // #Error
            }

            if (mark.nextTick) {
                onUse = (obj, name, ...payload) => {
                    const result = mark.effect(...payload)

                    setTimeout(() => {
                        mark.hp = mark.hp - 1

                        if (mark.hp <= 0) {
                            obj[name] = false
                        }
                    })

                    return result
                }
            } else {
                onUse = (obj, name, ...payload) => {
                    const result = mark.effect(...payload)

                    mark.hp = mark.hp - 1

                    if (mark.hp <= 0) {
                        obj[name] = false
                    }

                    return result
                }
            }
        }

        this.marks[name] = onUse
    }

    use(obj, name, ...payload) {
        const onUse = this.get(name)

        if (!onUse) {
            // #Error
        }

        if (obj[name] === true) {
            return onUse(obj, name, ...payload)
        }
    }

    mark(obj, name) {
        obj[name] = true
    }

    isMarked(obj, name) {
        return obj[name] === true
    }

    get(name) {
        return this.marks[name]
    }
}

module.exports = Marker
