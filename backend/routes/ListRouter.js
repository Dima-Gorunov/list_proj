const Router = require('express')
const router = new Router()
const listController = require('../controllers/ListController')

router.post('/', listController.create)
router.get('/', listController.getAll)
router.put('/', listController.update)
router.delete('/', listController.deleteList)


module.exports = router