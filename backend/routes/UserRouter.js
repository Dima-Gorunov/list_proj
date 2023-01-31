const Router = require('express')
const router = new Router()
const userController = require('../controllers/UserController')
const authMiddleware = require('../middleware/AuthMiddleware')
const checkRoleMiddleware = require('../middleware/CheckRoleMiddleware')


router.post('/registration', userController.registration)// => {...data:{user:{id, email, role}, token:"w2g8ehj35h9g3ujq25"}}
router.post('/login', userController.login) // => {...data:{token:"24gdef5f9gqw"}}
router.get('/getAll', checkRoleMiddleware("ADMIN"), userController.getAll) // => {... data:{[***]} ...}
router.get('/auth', authMiddleware, userController.check)  // => {...data:{user:{id, email, role}, newToken:"28f7ew5h89q2w"}}
//                                                         // при этом запросе из header цепляется токен и..
//                                                         // ..в результате возвращается user id.. далее..
//                                                         // ..можно делать запросы к базе по id
router.put('/update', userController.updateUser)
router.put('/setRole', checkRoleMiddleware("ADMIN"), userController.setRole)
router.delete('/delete', checkRoleMiddleware("ADMIN"), userController.deleteUser)
module.exports = router