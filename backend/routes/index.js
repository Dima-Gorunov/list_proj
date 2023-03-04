const Router = require('express')
const router = new Router()

const listRouter = require('./ListRouter')
const userRouter = require('./UserRouter')
const fileRouter=require('./FileRouter')
router.use('/list', listRouter)
router.use('/user', userRouter)
router.use('/file', fileRouter)
module.exports = router

