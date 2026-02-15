const { Op } = require("sequelize");
const { File } = require("../models/models");
const FileDto = require("../dtos/fileDto");
const fs = require("fs");

class FilesController {
    async upload(req, res) {
        try {
            const { fileName, filePath, fullUrl, fileType, file, originalUrl, originalName, fileValidationError } = req;

            if (fileValidationError) {
                return res.status(400).json({ result_code: 1, message: fileValidationError.message });
            }

            const { id } = req.user;
            if (!fileName || !filePath || !fullUrl) {
                return res.json({
                    result_code: 1,
                    message: `insufficient data`,
                });
            }
            const fileRes = await File.create({
                name: fileName,
                originalName: originalName,
                path: filePath,
                fullPath: filePath + fileName,
                userId: id,
                url: fullUrl,
                type: fileType,
                size: file.size,
                originalUrl: originalUrl,
            });

            return res.json({ file: new FileDto(fileRes) });
        } catch (e) {
            return res.status(400).json({ result_code: 1, message: e.message });
        }
    }

    async delete(req, res) {
        try {
            const userId = req.user.id;
            const filesIds = req.body;

            // Проверяем, что filesIds - массив
            if (!Array.isArray(filesIds) || filesIds.length === 0) {
                return res.status(400).json({
                    result_code: 1,
                    message: "Please provide an array of file IDs",
                });
            }

            // Находим файлы, принадлежащие пользователю
            const findFiles = await File.findAll({
                where: {
                    [Op.and]: [{ userId: userId }, { id: { [Op.in]: filesIds } }],
                },
            });

            if (findFiles.length === 0) {
                return res.status(404).json({
                    result_code: 1,
                    message: "No files found for deletion",
                });
            }

            // Массив для хранения результатов удаления
            const deletionResults = [];

            // Шаг 1: Удаляем файлы из файловой системы
            for (const file of findFiles) {
                try {
                    // Собираем полный путь к файлу
                    const fullPath = file.fullPath;

                    // Проверяем существование файла и удаляем
                    try {
                        console.log("-------попытка удалить файл: path: ", fullPath);

                        // Используем fs.promises для асинхронных операций
                        await fs.promises.access(fullPath);
                        // Удаляем файл
                        await fs.promises.unlink(fullPath);

                        deletionResults.push({
                            fileId: file.id,
                            fileName: file.name,
                            fileSystem: { success: true, message: "File deleted from filesystem" },
                            database: null,
                        });
                    } catch (fsError) {
                        // Файл не найден в файловой системе
                        deletionResults.push({
                            fileId: file.id,
                            fileName: file.name,
                            fileSystem: {
                                success: false,
                                message: "File not found in filesystem",
                                error: fsError.message,
                            },
                            database: null,
                        });
                    }
                } catch (error) {
                    deletionResults.push({
                        fileId: file.id,
                        fileName: file.name,
                        fileSystem: {
                            success: false,
                            message: "Error deleting from filesystem",
                            error: error.message,
                        },
                        database: null,
                    });
                }
            }

            // Шаг 2: Удаляем записи из базы данных
            const deletedIds = [];
            const dbErrors = [];

            for (const file of findFiles) {
                try {
                    // Удаляем запись из БД
                    await file.destroy();
                    deletedIds.push(file.id);

                    // Обновляем результат
                    const result = deletionResults.find((r) => r.fileId === file.id);
                    if (result) {
                        result.database = { success: true, message: "Record deleted from database" };
                    }
                } catch (dbError) {
                    dbErrors.push({
                        fileId: file.id,
                        error: dbError.message,
                    });

                    // Обновляем результат
                    const result = deletionResults.find((r) => r.fileId === file.id);
                    if (result) {
                        result.database = {
                            success: false,
                            message: "Error deleting from database",
                            error: dbError.message,
                        };
                    }
                }
            }

            // Шаг 3: Очищаем пустые папки (опционально)
            try {
                await this.cleanupEmptyDirectories(findFiles);
            } catch (cleanupError) {
                console.warn("Directory cleanup error:", cleanupError.message);
            }

            // Формируем ответ
            const successfulDeletions = deletionResults.filter((r) => r.database?.success === true).length;

            return res.json({
                result_code: 0,
                message: `Successfully deleted ${successfulDeletions} of ${findFiles.length} files`,
                total_requested: filesIds.length,
                total_found: findFiles.length,
                total_deleted: successfulDeletions,
                details: deletionResults,
                errors: dbErrors.length > 0 ? dbErrors : undefined,
            });
        } catch (e) {
            console.error("Delete error:", e);
            return res.status(400).json({
                result_code: 1,
                message: e.message,
            });
        }
    }
}

module.exports = new FilesController();
