const multer = require('multer')
const {
    createFullUrl, createAbsolutePath,
    generateFileName
} = require("../../constant")
const fs = require('fs')
const postStorage = multer.diskStorage({
    destination(req, file, cb) {
        const {id} = req.user
        const startPath = `user_${id}/post/`
        const absolutePath = createAbsolutePath(startPath)
        if (!fs.existsSync(absolutePath)) {
            fs.mkdirSync(absolutePath, {recursive: true})
        }
        req.filePath = absolutePath
        req.startPath = startPath
        cb(null, absolutePath)
    },
    filename(req, file, cb) {
        const fileName = generateFileName(file.originalname)
        req.fileName = fileName
        req.postImgUrl = createFullUrl(req.startPath, fileName)
        cb(null, fileName)
    }
})

const fileFilter = (req, file, cb) => {
    // Проверяем, является ли файл JPG
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        // Если файл не JPG, то вызываем ошибку
        const error = new Error('Only JPG files are allowed');
        error.code = 'fileTypeError';
        return cb(error);
    }
    // Если файл допустим, то вызываем колбэк без ошибок
    cb(null, true);
}

module.exports = multer({
    storage: postStorage,
    fileFilter: fileFilter
})