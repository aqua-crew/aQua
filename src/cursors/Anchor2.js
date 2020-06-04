const Cursor = require('../interfaces/Cursor')
const Coord = require('../models/Coord')
const Selection = require('../models/Selection')
const { DOM } = require('../utils/index')

class Anchor extends Cursor {
    constructor(aqua) {
        super()
        this.aqua = aqua

        this.coord = new Coord
        this.layout = new Coord
        this.selection = new Selection

        this.$cursor = null
        this.$selection = null
        this.$selectionParts = null

        this.state = {
            moved: 'none',
            health: 0,
        }

        return this.init()
    }

    init() {
        const proxy = this.setCoordProxy()

        proxy.$create()
        proxy.$mount()
        proxy.$createSelection()
        proxy.$mountSelection()

        return proxy
    }

    updateSelection() {
        const renderData = this.renderDataOfSelection()

        this.$updateSelection(renderData)
    }

    updateCoord({
        force = false,
        update = true,
        moved = null,
    } = {}) {
        if (moved !== null) {
            this.state.moved = moved
        }

        if (force || this.state.moved !== 'none') {
            this.state.moved === 'physical' ? this.updateCoordByPhysical() : this.updateCoordByLogical()
            this.state.moved = 'none'
        }

        if (update) {
            this.$update()
        }
    }

    updateCoordByPhysical() {
        this.coord.assign(this.aqua.locator.getCoordByLayout(this.physicalY, this.physicalX))
    }

    updateCoordByLogical() {
        this.coord.assign(this.aqua.locator.getCoordByCoord(this.logicalY, this.logicalX))
    }

    release() {
        if (this.state.health > 0) {
            this.damage(1)

            return
        }

        const $selectionCntr = this.aqua.uiMgr.get('selectionCntr')
        const $lineCntr = this.aqua.uiMgr.get('cursorCntr')
        DOM.removeChild($lineCntr, this.$cursor)
        DOM.removeChild($selectionCntr, this.$selection)

        this.$cursor = null
        this.$selection = null
        this.$selectionParts = null
    }

    /* Render */
    renderDataOfSelection() {
        const scrollerRect = this.aqua.korwa.getScrollerRect()
        const selectLines = this.selection.selectLines
        const start = this.selection.start
        const end = this.selection.end
        const lineHeight = this.aqua.korwa.getSingleLineHeight()

        if (selectLines === 0) {
            return [
                {
                    open: false,
                    top: 0,
                    height: 0,
                    left: 0,
                    right: 0,
                },
                {
                    open: false,
                    top: 0,
                    height: 0,
                },
                {
                    open: false,
                    top: 0,
                    height: 0,
                    right: 0,
                },
            ]
        }

        if (selectLines === 1 || selectLines === -1) {
            return [
                {
                    open: true,
                    top: start.physicalY,
                    height: lineHeight,
                    left: start.physicalX,
                    right: scrollerRect.width - end.physicalX,
                },
                {
                    open: false,
                    top: 0,
                    height: 0,
                },
                {
                    open: false,
                    top: 0,
                    height: 0,
                    right: 0,
                },
            ]
        }

        if (selectLines === 2 || selectLines === -2) {
            return [
                {
                    open: true,
                    top: start.physicalY,
                    height: lineHeight,
                    left: start.physicalX,
                    right: 0,
                },
                {
                    open: false,
                    top: 0,
                    height: 0,
                },
                {
                    open: true,
                    top: end.physicalY,
                    height: lineHeight,
                    right: scrollerRect.width - end.physicalX,
                },
            ]
        }

        if (selectLines > 2 || selectLines < -2) {
            return [
                {
                    open: true,
                    top: start.physicalY,
                    height: lineHeight,
                    left: start.physicalX,
                    right: 0,
                },
                {
                    open: true,
                    top: start.physicalY + lineHeight,
                    height: end.physicalY - start.physicalY - lineHeight,
                },
                {
                    open: true,
                    top: end.physicalY,
                    right: scrollerRect.width - end.physicalX,
                    height: lineHeight,
                },
            ]
        }
    }

    /* State */
    cure(health = 1) {
        this.state.health = this.state.health + health
    }

    damage(health = 1) {
        this.state.health = this.state.health - health
    }

    setHealth(health = this.state.health) {
        this.state.health = health
    }

    /* Rare */
    setCoordProxy() {
        return new Proxy(this, {
            set: function(obj, prop, value) {
                if (prop === 'physicalY' || prop === 'physicalX') {
                    obj.state.moved = 'physical'
                    obj.coord[prop] = value
                    return
                }

                if (prop === 'logicalY' || prop === 'logicalX') {
                    obj.state.moved = 'logical'
                    obj.coord[prop] = value
                    return
                }

                if (prop === 'insideY') {
                    obj.coord[prop] = value
                }

                obj[prop] = value
            },

            get: function(obj, prop) {
                if (prop === 'physicalY' || prop === 'logicalY' || prop === 'physicalX' || prop === 'logicalX' || prop === 'insideY' || prop === 'maxInsideY') {
                    return obj.coord[prop]
                }

                return obj[prop]
            }
        })
    }

    /* DOM */
    $create() {
        this.$cursor = DOM.e('i', {'class': 'anchor', 'style': 'left: 0px; top: 0px;'})

        return this.$cursor
    }

    $createSelection() {
        const $selection = DOM.e('div', {'class': 'selection'})
        const $selectionParts = []

        for (let i = 0; i < 3; i++) {
            const $part = DOM.e('div', {'class': 'selection-part'})
            $selectionParts.push($part)
            DOM.appendChild($selection, $part)
        }

        this.$selection = $selection
        this.$selectionParts = $selectionParts
    }

    $mountSelection($selection = this.$selection) {
        const $selectionCntr = this.aqua.uiMgr.get('selectionCntr')
        DOM.appendChild($selectionCntr, $selection)
    }

    $updateSelection([firstLine, secondLine, thirdLine] = this.renderDataOfSelection()) {
        this.$selectionParts[0].style.cssText = `display: ${firstLine.open ? 'block' : 'none'}; top: ${firstLine.top}px; left: ${firstLine.left}px; height: ${firstLine.height}px; right: ${firstLine.right}px;`
        this.$selectionParts[1].style.cssText = `display: ${secondLine.open ? 'block' : 'none'}; top: ${secondLine.top}px; height: ${secondLine.height}px`
        this.$selectionParts[2].style.cssText = `display: ${thirdLine.open ? 'block' : 'none'}; top: ${thirdLine.top}px; right: ${thirdLine.right}px; height: ${thirdLine.height}px;`
    }

    $mount($cursor = this.$cursor) {
        const $lineCntr = this.aqua.uiMgr.get('cursorCntr')
        DOM.appendChild($lineCntr, $cursor)
    }

    $update(coord = this.coord) {
        this.$cursor.style.cssText = `left: ${coord.physicalX}px; top: ${coord.physicalY}px`
    }
}

module.exports = Anchor
