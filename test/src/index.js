const Aqua = require('../../index')
const AquaHeart = require('../plugins/AquaHeart')

// const content2 =
// `▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁`

const content =
`
APEX大好きにじさんじバーチャルライバーの勇気ちひろです！

レイス使い
レイス愛は負けませぬぞ！

APEXが好きすぎて24時間できるので、長くやってても楽しんでるなぁ程度に思っていてください！

🎀ちひろさんからのお願い💙
こちらFPS始めて1年たったくらいです。
温かい心で観戦をおねがいします。
アドバイスもありがたいですがFPSは正解は結果論もあります。自分で考え、少しずつ成長していくと思いますので、見守っていてください。本当にわからないときはたずねたり、師匠に聞きますのでご安心ください。アドバイスもありがたいですがFPSは正解は結果論もあります。自分で考え、少しずつ成長していくと思いますので、見守っていてください。本当にわからないときはたずねたり、師匠に聞きますのでご安心ください。アドバイスもありがたいですがFPSは正解は結果論もあります。自分で考え、少しずつ成長していくと思いますので、見守っていてください。本当にわからないときはたずねたり、師匠に聞きますのでご安心ください。
また試合ごとに声に出しての反省会はほとんどしません。
つぎつぎー！といえど心の中で考えていることもありますので、よろしくお願いします。
罵倒の言葉などはモチベが下がるのでやめていただけると幸いです。
ちひろ以外の人もコメントは見ています。節度を持ったコメントをおねがいします。
あまりに見兼ねるコメントがあった場合は大変申し訳ないのですが、ブロックさせていただきますのでご了承ください。あまりに見兼ねるコメントがあった場合は大変申し訳ないのですが、ブロックさせていただきますのでご了承ください。

🎀今まで多かった質問💙
Q:ハンマーもってるキャラは何ですか？
A:レイス→2500　オクタン→2000

Q:APEXパックなんでためてるんですか？
A:ほしいものがないからです。
待ち時間などひまな時にひいたりします。

Q:なぜ英語ボイスにしているんですか？
A:レイスの英語の声が好きだからです。
あとは海外の方にも少しでも楽しんでいただくためです！

Q:使っているデバイスは何ですか？
A:キーボードはNPETさんのゲーミングキーボード、マウスはLogicoolさんのG502、マイクはSHUREさんのBETA58A、イヤホンはコンビニさんの1000円くらいのイヤホンです。

Q：どっちのマップが好きですか？
A：どっちもそれぞれ良さがあるので好きです！

Q:どうやって日本語表記、英語ボイスにしてるんですか？
A:originにログインした後、左側にある項目の『ゲームライブラリ』を押してAPEXの上で右クリックします。そこに出てくる『ゲームのプロパティ』を押します。
そこにあるタブの『詳細な起動オプション』を選択し、『ゲーム内言語』を日本語にします。
下の『コマンドラインの引数』のところに【+miles_language english】←この【】の中をコピペして保存するだけです。
※起動オプションでの入力は公式は非推奨としています。
何かあったとしてもご自身の責任の上で入力してください。

※その他便利なコマンド紹介👇👇
-fullscreen (APEX起動時にフルスクリーンで起動)
-novid(起動時のムービーをカット)
 +exec autoexec
-preload(起動時に色々読み込む。起動時は少しだけ重く感じますが、パフォーマンスを向上させる)
+m_rawinput 1(マウスの入力をOSを介さずにゲームに反映)
-forcenovsync (垂直同期をオフ)
-refresh 144(リフレッシュレートを144Hzにする。240Hzの方は144を240にして下さい。)
+fps_max 0(MAXの横の数字以上のフレームレートを出さない(0だとフレームレート上限をなくせる))
+cl_showfps 4(ゲームのフレームレートを左上に表示)知りたい人だけかなちひろはこれは入れてない
–threads 8(CPUスレッド数を指定)

※上記を個別で入れる方は半角スペース入れないと反応しないときあります。

👇上記全部入れるとしてのコピペ用
+miles_language english -fullscreen -novid +exec autoexec -preload +m_rawinput 1 -forcenovsync -refresh 144 +fps_max 0 +cl_showfps 4 -threads 8

起動オプションはアプデなどが入ったときに消えてしまうことがあるので、都度確認してね！

🎀スペシャルサンクス💙
サムネイル：やみりね様
配信内：39号様
ラスト：リオ・デ・ジャネイゾ様

※しゅうえきかありがとうです！これもにぃに、ねぇねのおかげです！
スパチャについてですが、ゲームなど止まってしまったりしてしまうので
つどのありがとうはこころの中でいいます！

☆チャンネルとうろく
https://www.youtube.com/channel/UCLO9...

☆メンバーシップとうろくhttps://www.youtube.com/channel/UCLO9...

☆Twitter
https://twitter.com/Chihiro_yuki23

☆にじさんじ公式BOOTH
https://nijisanji.booth.pm/
ボイスはんばい(((*・ω・(ε･* ))) ﾁｭｯ♪

☆お問い合わせ・ファンレター
https://nijisanji.ichikara.co.jp/cont...
`

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

    assets: {
        image: {
            allow: ['inline', 'block']
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
        mounted(aqua) {
            aqua.uiMgr.get('bgCntr').innerHTML = `<img id="aq" class="bg-image" src="${require('../images/aqua-chan.png')}" />`
        },
        ready() {},
        destroyed() {},
    },

    plugins: {
        AquaHeart
    },
})

// aqua.write(' +exec autoexec') // BUG <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
aqua.write('1')
aqua.docMgr.write(content.split('\n'), {
    y: 1000,
})
aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write('          '.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
// aqua.docMgr.write(content.split('\n'))
