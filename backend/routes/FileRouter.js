const Router = require("express");
const router = new Router();
const fileController = require("../controllers/FilesController");
const upload = require("../middleware/filemiddleware/Upload");
const authMiddleware = require("../middleware/AuthMiddleware");
const checkActivatedMiddleware = require("../middleware/CheckActivatedMiddleware");

// no realised on frontend
router.post("/upload", authMiddleware, checkActivatedMiddleware, upload.single("file"), fileController.upload);
router.delete("/delete", authMiddleware, checkActivatedMiddleware, fileController.delete);

// disabled
// router.put('/update', fileController.updateFile)

module.exports = router;
