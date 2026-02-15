const multer = require("multer");
const { join } = require("path");
const fs = require("fs").promises; // Используем promise-based fs
const diskService = require("../../helpers/diskService");
const uuid = require("uuid");

const { generateFileName, createFullUrl, fileFolderPath, allFileFoldersPaths, fileFolderPath2 } = require("../../constant");

const imageMimetypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "image/bmp",
    "image/tiff",
    "image/x-icon",
    "image/vnd.microsoft.icon",
    "image/heic",
    "image/heif",
    "image/avif",
];

const videoMimetypes = [
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-ms-wmv",
    "video/x-matroska",
    "video/3gpp",
    "video/3gpp2",
    "video/x-flv",
    "video/x-m4v",
    "video/mpeg",
    "video/x-ms-asf",
];

const storage = multer.diskStorage({
    async destination(req, file, cb) {
        try {
            const { id } = req.user;
            if (!id) {
                return cb(new Error("User ID not found"), false);
            }

            let folder = "files/";
            if (imageMimetypes.includes(file.mimetype)) {
                folder = "images/";
            } else if (videoMimetypes.includes(file.mimetype)) {
                folder = "videos/";
            }

            const urlPath = `user_${id}/${folder}`;

            const absolutePath = join(fileFolderPath2 + "/" + urlPath);
            try {
                await fs.access(absolutePath);
            } catch {
                await fs.mkdir(absolutePath, { recursive: true });
            }

            req.urlPath = urlPath;
            req.filePath = absolutePath;
            req.fileType = folder.replace("/", "");

            cb(null, absolutePath);
        } catch (error) {
            cb(error);
        }
    },
    filename(req, file, cb) {
        console.log("file.originalname");
        const fileName = generateFileName(file.originalname);
        req.fileName = fileName;
        req.originalName = file.originalname;
        req.fullUrl = createFullUrl(req.urlPath, fileName);
        req.fileUrl = join(req.filePath, fileName);
        req.originalUrl = `/${req.urlPath}${fileName}`;
        cb(null, fileName);
    },
});

// Простая проверка на папку
const fileFilter = (req, file, cb) => {
    const path = require("path");

    // Признаки папки:
    // 1. Нет расширения
    // 2. Содержит слеши
    // 3. MIME type папки

    const hasExtension = path.extname(file.originalname) !== "";
    const hasSlashes = file.originalname.includes("/") || file.originalname.includes("\\");

    // Разрешенные MIME типы
    const allowedMimetypes = [...imageMimetypes, ...videoMimetypes];

    // Если это папка
    if (!hasExtension || hasSlashes) {
        req.fileValidationError = {
            code: "FOLDER_NOT_ALLOWED",
            message: "Загрузка папок не поддерживается",
            status: 400,
        };
        return cb(null, false);
    }

    if (!allowedMimetypes.includes(file.mimetype)) {
        req.fileValidationError = {
            code: "INVALID_FILE_TYPE",
            message: `Тип файла "${file.mimetype}" не поддерживается`,
            status: 400,
            allowedTypes: allowedMimetypes,
        };
        return cb(null, false);
    }
    cb(null, true);
};

module.exports = multer({
    storage,
    fileFilter, // Добавляем фильтр
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB
    },
});
