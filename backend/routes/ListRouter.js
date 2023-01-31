const Router = require('express')
const router = new Router()
const listController = require('../controllers/ListController')
const authMiddleware = require('../middleware/AuthMiddleware')

router.get('/', listController.getAll)
router.get('/getAllDev', listController.getAllDev)
router.post('/', listController.create)
router.put('/', listController.update)
router.delete('/', authMiddleware, listController.deleteList)


module.exports = router