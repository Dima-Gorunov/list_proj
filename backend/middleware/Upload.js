const multer = require('multer')
const moment = require('moment')
const {mkdir} = require('fs/promises');
const {join, resolve} = require('path')
const {fileFolderPath} = require('../constant')
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, fileFolderPath) // base dir===/backend
    },
    filename(req, file, cb) {
        const mimetypeImage = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml']
        const folders = ["images", "files"]

        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        folders.forEach(async (e) => {
            await mkdir(join(fileFolderPath, `user_${req.user.id}`, e), {recursive: true}).then(() => {
                cb(null, `user_${req.user.id}/${mimetypeImage.some(e => e === file.mimetype) ? "images" : "files"}/${date}-${file.originalname}`)
                // ПРИМЕР!!
                // создание файла в папке files с названием user_id/images/07032023-141047_435.file_name.jpeg
                // можно сказать полное название файла => часть пути => конечная точка
            })
        })
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
    storage, // storage: storage
    //fileFilter, // fileFilter: fileFilter,
    //limits
})