const Router = require('express')
const router = new Router()
const listController = require('../controllers/ListController')
const authMiddleware = require('../middleware/AuthMiddleware')
const postStorage = require("../middleware/filemiddleware/postStorage")


router.get('/', authMiddleware, listController.getAll)
router.post('/', authMiddleware, postStorage.fields([{name: 'file'}]), listController.create)
router.delete('/', authMiddleware, listController.deleteList)


// disabled
// router.get('/getAllDev', listController.getAllDev)
// router.put('/', authMiddleware, listController.updateList)
module.exports = router