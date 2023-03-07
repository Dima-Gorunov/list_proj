const multer = require('multer')
const moment = require('moment')
const {fileFolderPath} = require('../constant')
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, fileFolderPath) // base dir===/backend
    },
    filename(req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        const mimetypeImage = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml']
        cb(null, `user_${req.user.id}/${mimetypeImage.some(e => e === file.mimetype) ? "images" : "files"}/${date}-${file.originalname}`)
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