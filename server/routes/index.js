const Router = require("express")
const router = new Router()
const typeRouter = require('./typeRouter')
const brandRouter = require('./brandRouter')
const elementRouter = require('./elementRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/element', elementRouter)

module.exports = router