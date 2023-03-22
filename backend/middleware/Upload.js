const multer = require('multer')
const {join, resolve} = require('path')
const fs = require('fs')
const {
    fileFolderPath,
    generateFileName,
    serverName,
    createAbsolutePath,
    createFullUrl
} = require('../constant')
const storage = multer.diskStorage({
    destination(req, file, cb) {
        const {id} = req.user
        if (!id) {
            return res.status(400).json({result_code: 1, message: "insufficient data"})
        }
        const mimetypeImage = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml']
        const urlPath = `user_${id}/${mimetypeImage.some(e => e === file.mimetype) ? "images/" : "files/"}`
        let absolutePath = createAbsolutePath(urlPath)

        if (!fs.existsSync(absolutePath)) {
            fs.mkdirSync(absolutePath, {recursive: true});
        }
        req.urlPath = urlPath
        req.filePath = absolutePath
        cb(null, absolutePath) // base dir===/backend
    },
    filename(req, file, cb) {
        const fileName = generateFileName(file.originalname)
        req.fileName = fileName
        req.fullUrl = createFullUrl(req.urlPath, fileName)
        req.fileUrl = join(req.filePath + "/" + fileName)
        cb(null, fileName)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits = {
    fileSize: 1024 * 1024 * 5
}

module.exports = multer({
    storage // storage: storage
    //fileFilter, // fileFilter: fileFilter,
    //limits
})