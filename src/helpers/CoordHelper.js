module.exports = {
    greater(coordA, coordB, equal = false) {
        const diffY = coordA.y - coordB.y

        if (diffY > 0) {
            return true
        }

        if (diffY < 0) {
            return false
        }

        const diffX = coordA.x - coordB.x

        if (diffX > 0) {
            return true
        }

        if (diffX < 0) {
            return false
        }

        return equal
    },

    less(coordA, coordB, equal = false) {
        const diffY = coordA.y - coordB.y

        if (diffY < 0) {
            return true
        }

        if (diffY > 0) {
            return false
        }

        const diffX = coordA.x - coordB.x

        if (diffX < 0) {
            return true
        }

        if (diffX > 0) {
            return false
        }

        return equal
    },

    equal(coordA, coordB) {
        return coordA.y === coordB.y && coordA.x === coordB.x
    },
}
