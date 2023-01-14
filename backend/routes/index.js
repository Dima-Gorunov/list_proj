const Router = require('express')
const router = new Router()

const listRouter = require('./ListRouter')

router.use("/list", listRouter)

module.exports = router

