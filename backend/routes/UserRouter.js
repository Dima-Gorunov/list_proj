const Router = require("express");
const router = new Router();
const userController = require("../controllers/UserController");
const authMiddleware = require("../middleware/AuthMiddleware");
const checkActivatedMiddleware = require("../middleware/CheckActivatedMiddleware");
const adminMiddleware = require("../middleware/AdminMiddleware");
const { body } = require("express-validator");

router.post(
    "/registration",
    body("email").isEmail().withMessage("Invalid email address").isLength({ max: 64 }).withMessage("Email must be 64 characters or less"),
    body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
    userController.testRegistration,
);

router.get("/activate/:link", userController.activate);
router.post("/login", userController.testLogin);
router.post("/logout", userController.testLogout);
router.get("/refresh", userController.refresh); // выцепляем refreshToken из cookies каждый раз
router.get("/info", authMiddleware, userController.getInfo);
router.get("/getMyFiles", authMiddleware, checkActivatedMiddleware, userController.getMyFiles);
router.get("/getAllUsers", authMiddleware, checkActivatedMiddleware, adminMiddleware, userController.getAllUsers);
router.put("/changeUser", authMiddleware, checkActivatedMiddleware, adminMiddleware, userController.changeUser);

// disabled
// router.get('/auth', authMiddleware, userController.check)
// router.post('/testMethod', userController.testMethod)
// router.put('/setRole', userController.setRole)
// router.put('/update', userController.updateUser)
module.exports = router;
