const multer = require('multer')
const {
    generateFileName, fileFolderPath,
    createAbsolutePath,
    createFullUrl
} = require("../../constant");
const path = require('path')
const fs = require('fs')
const avatarStorage = multer.diskStorage({  //d папке всегда олжен быть 1 файл
    destination(req, file, cb) {
        const {id} = req.user
        const startPath = `user_${id}/avatar/`
        const absolutePath = createAbsolutePath(startPath)
        if (!fs.existsSync(absolutePath)) {  // если нет директории - создаёт
            fs.mkdirSync(absolutePath, {recursive: true});
        }
        fs.readdir(absolutePath, (err, files) => {  // удаляет всё что было в директории
            if (err) throw err;
            for (const file of files) {
                fs.unlink(path.join(absolutePath, file), err => {
                    if (err) throw err;
                });
            }
        });
        req.filePath = absolutePath
        req.startPath = startPath
        cb(null, absolutePath)

    },
    filename(req, file, cb) {
        const fileName = generateFileName(file.originalname)
        req.fileName = fileName
        req.avatarUrl = createFullUrl(req.startPath, fileName)
        cb(null, fileName)
    }
})

module.exports = multer({
    storage: avatarStorage
})