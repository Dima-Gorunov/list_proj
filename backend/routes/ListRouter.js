const Router = require('express')
const router = new Router()
const listController = require('../controllers/ListController')
const authMiddleware = require('../middleware/AuthMiddleware')
const checkActivatedMiddleware = require('../middleware/CheckActivatedMiddleware')
const postStorage = require("../middleware/filemiddleware/postStorage")

router.get('/', authMiddleware, listController.getAllMy)
router.get('/all', authMiddleware, listController.getAll)
router.post('/', authMiddleware, checkActivatedMiddleware, postStorage.fields([{name: 'file'}]), listController.create)
router.delete('/', authMiddleware, checkActivatedMiddleware, listController.deleteList)


// disabled
// router.get('/getAllDev', listController.getAllDev)
// router.put('/', authMiddleware, listController.updateList)
module.exports = router