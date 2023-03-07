const Router = require('express')
const router = new Router()
const fileController = require('../controllers/FilesController')
const uploadMiddleware = require('../middleware/Upload')
const authMiddleware=require('../middleware/AuthMiddleware')

router.post('/upload', authMiddleware, uploadMiddleware.single("file"), fileController.upload)


module.exports = router