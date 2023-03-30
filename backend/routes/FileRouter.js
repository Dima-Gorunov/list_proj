const Router = require('express')
const router = new Router()
const fileController = require('../controllers/FilesController')
const upload = require('../middleware/Upload')
const authMiddleware = require('../middleware/AuthMiddleware')
const checkActivatedMiddleware = require('../middleware/CheckActivatedMiddleware')


// no realised on frontend
router.post('/upload', authMiddleware, checkActivatedMiddleware, upload.fields([{name: 'file'}]), fileController.upload)
router.get('/', authMiddleware, checkActivatedMiddleware, fileController.getFile)
router.delete('/delete', authMiddleware, checkActivatedMiddleware, fileController.delete)


// disabled
// router.put('/update', fileController.updateFile)

module.exports = router