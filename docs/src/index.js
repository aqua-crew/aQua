const Aqua = require('../../index')
// const AquaHeart = require('../plugins/AquaHeart')

// Aqua.use(AquaProgress)

// const content2 =
// `▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁▷◁－－－－－－－－－－－－－－－－－－－－－－－－－▷◁`

const content = `
const { DataTransferItemHandler, Iterator, Khala, Kizuna, Marker, Noop, Progress } = require('./utils/index')
const { DefaultOptions } = require('./options/index')
const { ActionMgr, Chronicle, ContentMgr, CursorMgr, DocMgr, History, Inputer, Korwa, LineMgr, Locator, OptionMgr, PluginMgr, ProcessorMgr, Renderer, Scroller, State, UIMgr, ViewportMgr } = require('./components/index')
const { Coord, Content } = require('./models/index')
const Lines = require('./lines/index')
const Cursors = require('./cursors/index')
const Actions = require('./actions/index')
const UI = require('./ui/index')
const Processors = require('./processors/index')
const Marks = require('./marks/index')
const plugins = require('./plugins/index')

const { StringAsset, ImageAsset } = require('./assets/index')

const aqua = require('./aquaqua.jpg')

class Aqua {
    constructor(options) {
        this.optionMgr = new OptionMgr(this)

        this.progress = new Progress
        this.khala = new Khala
        this.lifetimes = new Khala
        this.docWatcher = new Khala
        this.kizuna = new Kizuna
        this.state = new State
        this.marker = new Marker

        this.loadOptions(options)

        this.uiMgr = new UIMgr(this)
        this.loadUI(UI)
        this.mountUI()

        this.pluginMgr = new PluginMgr(this)
        this.pluginMgr.install([...plugins, ...this.optionMgr.get('plugins')])

        this.optionMgr.normalize()
        this.lifetimes.emit('setup', this)
        this.progress.set(0)

        this.chronicle = new Chronicle(this)
        this.scroller = new Scroller(this)
        this.processorMgr = new ProcessorMgr(this)
        this.korwa = new Korwa(this)
        this.lineMgr = new LineMgr(this)
        this.cursorMgr = new CursorMgr(this)
        this.actionMgr = new ActionMgr(this)
        this.contentMgr = new ContentMgr(this)
        this.docMgr = new DocMgr(this)
        this.locator = new Locator(this)
        this.viewportMgr = new ViewportMgr(this)
        this.renderer = new Renderer(this)
        this.inputer = new Inputer(this)

        this.progress.set(20)

        this.loadMarks(Marks)
        this.loadProcessors(Processors)
        this.loadLines(Lines)
        this.loadCursors(Cursors)
        this.loadActions(Actions)
        this.loadViewportEvents()
        this.loadInputerEvents()
        this.loadDocumentEvents()

        this.lifetimes.emit('ready', this)
        this.progress.set(60)

        this.init()
        this.expose()

        this.lifetimes.emit('complete', this)
        this.progress.set(100)

        this.releaseExtendPlugins()
        this.progress = null






        /* Dev test */
        window.aqua = this
    }

    static use(ExtendPlugin, ...options) {
        if (!this.extendPlugins) {
            this.extendPlugins = []
        }

        if (this.extendPlugins.indexOf(ExtendPlugin) > -1) {
            return
        }

        this.extendPlugins.push(ExtendPlugin)

        ExtendPlugin.install ? ExtendPlugin.install(Aqua, ...options) : new ExtendPlugin(Aqua, ...options)
    }

    releaseExtendPlugins() {
        Aqua.extendPlugins = null
    }

    expose() {
        this.write = (...payload) => {
            this.chronicle.start('Input', this.cursorMgr.extract())
            this.docMgr.write(...payload)
            this.chronicle.end('Input', this.cursorMgr.extract())
        }

        this.read = this.docMgr.read.bind(this.docMgr)

        this.delete = (...payload) => {
            this.chronicle.start('Delete', this.cursorMgr.extract())
            this.docMgr.delete(...payload)
            this.chronicle.end('Delete', this.cursorMgr.extract())
        }

        this.do = this.cursorMgr.traverse.bind(this.cursorMgr)
    }

    init() {
        this.lineMgr.init()
        this.korwa.init()
        this.docMgr.init()

        this.viewportMgr.init({
            y: 0,
            height: this.korwa.getViewportRect().height,
            lps: 10,
        })

        this.scroller.init({
            y: 0,
            speed: 250,
            min: 0,
        })

        this.renderer.init()
        this.cursorMgr.init()
        this.chronicle.init()
        this.inputer.init()
    }

    loadProcessors(Processors) {
        Iterator.iterate(Processors, Processor => {
            this.processorMgr.load(Processor)
        })
    }

    loadOptions(options) {
        this.optionMgr.load(options)
    }

    loadMarks(Marks) {
        Iterator.iterate(Marks, (mark, name) => {
            this.marker.load(name, mark)
        })
    }

    loadPlugins(plugins) {
        plugins.forEach(plugin => {
            plugin.install(this)
        })
    }

    loadUI(UI) {
        Iterator.iterate(UI, (fn, name) => {
            this.uiMgr.load(name, fn)
        })
    }

    mountUI() {
        const structure = \`
            aqua
                bgCntr
                editor
                    viewport
                        inputerCntr
                            inputerLocator
                                inputer
                        scroller
                            components
                                fullWidthCntr
                                    selectedLineCntr
                                lineWidthCntr
                                    measurerCntr
                                        ramMeasurer
                                        lineMeasurer
                                        remMeasurer
                                    cursorCntr
                                    selectionCntr
                                    lineCntr
                        fixed
                            sideBarCntr
                                minimap
                                scrollBar
                fgCntr
        \`

        const $aqua = this.uiMgr.mountByString(structure, {
            mounted: (ele, name) => {
                this.uiMgr.set(name, ele)
            },
        })

        const $el = this.optionMgr.get('el')

        this.uiMgr.mount($el, $aqua)
    }

    loadLines(Lines) {
        Iterator.iterate(Lines, mod => {
            this.lineMgr.load(mod)
        })
    }

    loadCursors(Cursors) {
        Iterator.iterate(Cursors, mod => {
            this.cursorMgr.load(mod)
        })
    }

    loadActions(Actions) {
        Iterator.iterate(Actions, action => {
            this.actionMgr.load(action)
        })
    }

    loadViewportEvents() {
        const $viewport = this.uiMgr.get('viewport')

        this.kizuna.on($viewport, 'contextmenu', event => {
            event.preventDefault()
        })

        this.kizuna.on($viewport, 'mousedown', event => {
            event.preventDefault()
            this.kizuna.filterMousedown(event)
            this.inputer.focus()
        })

        this.kizuna.on($viewport, 'mousemove', event => {
            event.preventDefault()
            this.kizuna.filterMousemove(event)
        })

        this.kizuna.on($viewport, 'mouseup', event => {
            event.preventDefault()
            this.kizuna.filterMouseup(event)
        })

        this.kizuna.on($viewport, 'scroll', event => {
            this.scroller.handleScroll(event)
        })

        this.kizuna.on($viewport, 'dragover', event => {
            event.preventDefault()
        })

        this.kizuna.on($viewport, 'drop', event => {
            event.preventDefault()

            console.error('Drop event event.dataTransfer', event.dataTransfer)

            DataTransferItemHandler.handle(event.dataTransfer, {
                text: text => {
                    console.info('text', text)
                },

                html: html => {
                    const $test = document.getElementById('con')
                    const regexp = new RegExp(/^(<!--StartFragment -->)([\s\S]*)(<!--EndFragment-->)/, 'gm')
                    console.error(regexp.exec(html)[2])
                    console.info('html', html)
                },

                file: file => {
                    console.info('file', file)
                }
            })
        })
    }

    loadInputerEvents() {
        const $inputer = this.uiMgr.get('inputer')

        $inputer.focus()

        this.kizuna.on($inputer, 'focus', event => {
            this.state.focus = true
        })

        this.kizuna.on($inputer, 'blur', event => {
            this.state.focus = false
        })

        this.kizuna.on($inputer, 'input', event => {
            this.inputer.poll()
        })

        this.kizuna.on($inputer, 'keydown', event => {
            this.kizuna.filterKeydown(event)
        })

        this.kizuna.on($inputer, 'keyup', event => {
            // event.preventDefault()
            this.kizuna.filterKeyup(event)
        })

        this.kizuna.on($inputer, 'copy', event => {
            this.actionMgr.exec('Copy', event)
        })

        this.kizuna.on($inputer, 'cut', event => {
            this.actionMgr.exec('Cut', event)
        })

        this.kizuna.on($inputer, 'paste', event => {
            // this.inputer.poll()

            this.actionMgr.exec('Copy', event)

            // const items = event.clipboardData.items
            // console.error('Paste event.clipboardData', event.clipboardData)

            // if (!(event.clipboardData && items)) {
            //     return
            // }

            // for (let i = 0, len = items.length; i < len; i++) {
            //     DataTransferItemHandler.handle(items[i], {
            //         text: text => {
            //             console.info('text', text)
            //         },

            //         html: html => {
            //             const $test = document.getElementById('con')
            //             const regexp = new RegExp(/^(<!--StartFragment-->)([\s\S]*)(<!--EndFragment-->)/, 'gm')

            //             const c = regexp.exec(html)[2]
            //             console.error(c)
            //             $test.innerHTML = c
            //             console.info('html', html)
            //         },

            //         file: file => {
            //             console.info('file', file)
            //         }
            //     })
            // }

            // event.preventDefault()
        })

        this.khala.on('input', text => {
            this.chronicle.start('Input', this.cursorMgr.extract())

            this.cursorMgr.traverse(cursor => {
                if (!cursor.selection.isCollapsed()) {
                    this.actionMgr.execWithName('Backspace', 'backspace', cursor)
                }

                const { y, x } = this.docMgr.write(text, cursor)

                cursor.y = cursor.y + y
                cursor.x = cursor.x + x
            })

            this.chronicle.end('Input', this.cursorMgr.extract())

            this.renderer.render('dictionary', this.viewport, text)
        })
    }

    loadDocumentEvents() {
        this.kizuna.on(document, 'mousedown', event => {
            this.state.mousedown = true
        })

        this.kizuna.on(document, 'mouseup', event => {
            this.state.mousedown = false
        })

        this.kizuna.on(document, 'visibilitychange', event => {
            if (document.hidden && this.state.mousedown) {
                this.state.mousedown = false
            }

            document.title = document.hidden ? 'Minato' : 'Aqua'
        })
    }

    /* Extract */
    extract() {
        const doc = this.docMgr.extract()
        const cursors = this.cursors.extract()
    }
}

module.exports = Aqua
`

const content3 = `
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
        setup(aqua) {
            aqua.uiMgr.get('bgCntr').innerHTML = `<img id="aq" class="bg-image" src="${require('../images/aqua-chan.png')}" />`
        },
        ready(aqua) {},
        destroyed() {},
    },

    plugins: [
        // new AquaProgress,
    ],
})

// aqua.write(' +exec autoexec') // BUG <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< 开头的这个空格是精髓

// aqua.write(`line: {
//     start: 1,
//     height: 25,
// },`.split('\n'))
// aqua.write(content.split('\n'))
// aqua.write(content.split('\n'))
// aqua.write(content.split('\n'))

// aqua.write(content.split('\n'))

aqua.write(`
const vue = new Vue({
    el: '#app',
})
// Comment 1
/* Comment 2 */
/**
 * Comment 3
 */
`.split('\n'))

import '../tokenizer.js'
