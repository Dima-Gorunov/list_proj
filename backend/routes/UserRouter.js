const Router = require('express')
const router = new Router()
const userController = require('../controllers/UserController')
const authMiddleware = require('../middleware/AuthMiddleware')
const checkRoleMiddleware = require('../middleware/CheckRoleMiddleware')
const avatarStorage = require("../middleware/filemiddleware/avatarStorage")
const {body} = require("express-validator")

router.post('/testMethod', userController.testMethod)

router.post('/registration', userController.testRegistration)
router.get('/activate/:link', userController.activate)
router.post('/login', userController.testLogin)
router.post('/logout', userController.testLogout)
router.get('/refresh', userController.refresh)  // выцепляем refreshToken из cookies каждый раз
router.get('/getAll', checkRoleMiddleware("ADMIN"), userController.getAll)
router.get('/auth', authMiddleware, userController.check)
router.get('/info', authMiddleware, userController.getInfo)
router.put('/setAvatar', authMiddleware, avatarStorage.fields([{name: 'file'}]), userController.setAvatar)
router.put('/update', userController.updateUser)
router.put('/setRole', userController.setRole)
router.delete('/delete', checkRoleMiddleware("ADMIN"), userController.deleteUser)
module.exports = router
