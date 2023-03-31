const Router = require('express')
const router = new Router()
const userController = require('../controllers/UserController')
const authMiddleware = require('../middleware/AuthMiddleware')
const checkActivatedMiddleware = require('../middleware/CheckActivatedMiddleware')
const avatarStorage = require("../middleware/filemiddleware/avatarStorage")
const {body} = require("express-validator")

router.post('/registration',
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long'),
    userController.testRegistration)

router.get('/activate/:link', userController.activate)
router.post('/login', userController.testLogin)
router.post('/logout', userController.testLogout)
router.get('/refresh', userController.refresh)  // выцепляем refreshToken из cookies каждый раз
router.get('/info', authMiddleware, userController.getInfo)
router.put('/setAvatar', authMiddleware, checkActivatedMiddleware, avatarStorage.fields([{name: 'file'}]), userController.setAvatar)


// disabled
// router.get('/auth', authMiddleware, userController.check)
// router.post('/testMethod', userController.testMethod)
// router.put('/setRole', userController.setRole)
// router.put('/update', userController.updateUser)
// router.delete('/delete', checkRoleMiddleware("ADMIN"), userController.deleteUser)
// router.get('/getAll', checkRoleMiddleware("ADMIN"), userController.getAll)
module.exports = router
