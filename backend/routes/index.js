const Router = require('express')
const router = new Router()

const listRouter = require('./ListRouter')
const userRouter = require('./UserRouter')

router.use("/list", listRouter)
router.use('/user', userRouter)

module.exports = router

