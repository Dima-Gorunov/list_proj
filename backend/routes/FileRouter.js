const Router = require('express')
const router = new Router()
const fileController = require('../controllers/FilesController')
const upload = require('../middleware/Upload')
const authMiddleware = require('../middleware/AuthMiddleware')


// no realised on frontend
router.post('/upload', authMiddleware, upload.fields([{name: 'file'}]), fileController.upload)
router.get('/', fileController.getFile)
router.delete('/delete', fileController.delete)


// disabled
// router.put('/update', fileController.updateFile)

module.exports = router