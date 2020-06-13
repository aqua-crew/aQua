class Line {
    constructor(
        name = null,
        desc = null,
        marks = null,
    ) {
        this.name = name
        this.desc = desc
        this.marks = marks
    }

    create(content = null) {
        return this.template(content)
    }

    template(content = null) {}
}

module.exports = Line
