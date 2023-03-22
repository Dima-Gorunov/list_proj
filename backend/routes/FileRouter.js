const Router = require('express')
const router = new Router()
const fileController = require('../controllers/FilesController')
const upload = require('../middleware/Upload')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/upload', authMiddleware, upload.fields([{name: 'file'}]), fileController.upload)
router.get('/', fileController.getFile)
router.put('/update', fileController.update)
router.delete('/delete', fileController.delete)


module.exports = router