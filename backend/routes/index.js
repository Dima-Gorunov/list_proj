const Router = require("express");
const router = new Router();

const userRouter = require("./UserRouter");
const fileRouter = require("./FileRouter");
router.use("/user", userRouter);
router.use("/file", fileRouter);

module.exports = router;
