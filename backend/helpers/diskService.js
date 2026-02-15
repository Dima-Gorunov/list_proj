const { join } = require("path");
const fs = require("fs").promises;
const os = require("os");

class DiskService {
    // Функция для получения свободного места на диске
    async getFreeSpace(path) {
        try {
            // Используем statfs для получения информации о файловой системе
            const stats = await fs.statfs(path);
            const freeBytes = stats.bsize * stats.bavail;
            const freeGB = freeBytes / (1024 * 1024 * 1024);
            return {
                freeBytes,
                freeGB: parseFloat(freeGB.toFixed(2)),
                freeMB: parseFloat((freeBytes / (1024 * 1024)).toFixed(2)),
            };
        } catch (error) {
            console.error(`Ошибка получения свободного места для ${path}:`, error.message);
            return null;
        }
    }

    // Функция для выбора лучшего диска
    async chooseBestDisk(allFilePath, urlPath) {
        const diskInfo = [];
        const errors = [];

        console.log("=== Проверка и подготовка дисков ===");

        for (const [index, basePath] of allFilePath.entries()) {
            try {
                // 1. Проверяем базовый путь
                await fs.access(basePath);
                console.log(`[${index + 1}/${allFilePath.length}] 📁 Базовый путь: ${basePath}`);

                // 2. Проверяем свободное место
                const spaceInfo = await this.getFreeSpace(basePath);

                if (!spaceInfo) {
                    errors.push(`Не удалось получить информацию о свободном месте для ${basePath}`);
                    continue;
                }

                // 3. Формируем абсолютный путь
                const absolutePath = join(basePath, urlPath);

                // 4. Проверяем и создаем целевую директорию
                try {
                    await fs.access(absolutePath);
                    console.log(`   ✅ Директория существует: ${absolutePath}`);
                } catch (dirError) {
                    if (dirError.code === "ENOENT") {
                        // Директории нет - создаем
                        console.log(`   📂 Создаем директорию: ${absolutePath}`);
                        await fs.mkdir(absolutePath, { recursive: true });

                        // Проверяем права доступа
                        try {
                            const stats = await fs.stat(absolutePath);
                            const isDirectory = stats.isDirectory();
                            const hasWriteAccess = true; // Мы только что создали, значит есть доступ

                            if (!isDirectory) {
                                throw new Error("Созданный путь не является директорией");
                            }

                            console.log(`   ✅ Директория успешно создана`);
                        } catch (verifyError) {
                            errors.push(`Ошибка верификации директории ${absolutePath}: ${verifyError.message}`);
                            continue;
                        }
                    } else {
                        // Другая ошибка
                        throw dirError;
                    }
                }

                // 5. Проверяем возможность записи
                const testFilePath = join(absolutePath, `.write_test_${Date.now()}.tmp`);
                try {
                    await fs.writeFile(testFilePath, "test");
                    await fs.unlink(testFilePath);
                    console.log(`   ✏️  Проверка записи: OK`);
                } catch (writeError) {
                    errors.push(`Нет прав на запись в ${absolutePath}: ${writeError.message}`);
                    continue;
                }

                // 6. Добавляем в список доступных дисков
                diskInfo.push({
                    index: index + 1,
                    basePath,
                    absolutePath,
                    freeGB: spaceInfo.freeGB,
                    freeMB: spaceInfo.freeMB,
                    freeBytes: spaceInfo.freeBytes,
                    totalGB: spaceInfo.totalGB,
                    exists: true,
                    writable: true,
                    pathCreated: true,
                });

                console.log(`   💾 Свободно: ${spaceInfo.freeGB.toFixed(2)} GB / Всего: ${spaceInfo.totalGB.toFixed(2)} GB`);
                console.log(`   📊 Использовано: ${((spaceInfo.usedGB / spaceInfo.totalGB) * 100).toFixed(1)}%\n`);
            } catch (error) {
                console.log(`[${index + 1}/${allFilePath.length}] ❌ ${basePath}: ${error.message}`);

                diskInfo.push({
                    index: index + 1,
                    basePath,
                    absolutePath: join(basePath, urlPath),
                    freeGB: 0,
                    freeMB: 0,
                    freeBytes: 0,
                    totalGB: 0,
                    exists: false,
                    writable: false,
                    pathCreated: false,
                    error: error.message,
                });

                errors.push(`${basePath}: ${error.message}`);
            }
        }

        console.log("======================\n");

        // Логируем ошибки если есть
        if (errors.length > 0) {
            console.log("⚠️  Зарегистрированные ошибки:");
            errors.forEach((error, i) => console.log(`   ${i + 1}. ${error}`));
            console.log();
        }

        // Фильтруем доступные диски
        const availableDisks = diskInfo.filter(
            (disk) => disk.exists && disk.writable && disk.freeGB > 1, // минимум 1GB свободно
        );

        if (availableDisks.length === 0) {
            const errorMessage = "Нет доступных дисков с достаточным свободным местом и правами записи";
            console.error(`❌ ${errorMessage}`);
            throw new Error(errorMessage);
        }

        // Сортируем по свободному месту (по убыванию)
        availableDisks.sort((a, b) => b.freeBytes - a.freeBytes);

        const bestDisk = availableDisks[0];

        // Красивый вывод выбранного диска
        console.log("🎯 ВЫБРАН НАИЛУЧШИЙ ДИСК:");
        console.log("┌─────────────────────────────────────────────");
        console.log(`│ Диск: ${bestDisk.basePath}`);
        console.log(`│ Целевая папка: ${bestDisk.absolutePath}`);
        console.log(`│ Свободно: ${bestDisk.freeGB.toFixed(2)} GB`);
        console.log(`│ Всего: ${bestDisk.totalGB.toFixed(2)} GB`);
        console.log(`│ Заполнение: ${((1 - bestDisk.freeGB / bestDisk.totalGB) * 100).toFixed(1)}%`);
        console.log("└─────────────────────────────────────────────\n");

        return bestDisk;
    }

    // Функция для создания директории с выбором лучшего диска
    async createDirectoryWithDiskCheck(allFilePath, urlPath) {
        try {
            // 1. Выбираем лучший диск
            const bestDisk = await this.chooseBestDisk(allFilePath, urlPath);

            console.log(`✅ Выбран диск: ${bestDisk.basePath}`);
            console.log(`   Свободно: ${bestDisk.freeGB} GB (${bestDisk.freeMB} MB)`);
            console.log(`   Полный путь: ${bestDisk.absolutePath}\n`);

            // 2. Создаем директорию на выбранном диске
            try {
                await fs.access(bestDisk.absolutePath);
                console.log(`📁 Директория уже существует: ${bestDisk.absolutePath}`);
            } catch {
                await fs.mkdir(bestDisk.absolutePath, { recursive: true });
                console.log(`📁 Создана директория: ${bestDisk.absolutePath}`);
            }

            // 3. Проверяем свободное место после создания
            const afterSpace = await this.getFreeSpace(bestDisk.basePath);
            if (afterSpace) {
                console.log(`📊 Свободно после создания: ${afterSpace.freeGB} GB`);
            }

            return {
                success: true,
                absolutePath: bestDisk.absolutePath,
                basePath: bestDisk.basePath,
                freeSpaceBefore: bestDisk.freeGB,
                freeSpaceAfter: afterSpace?.freeGB,
            };
        } catch (error) {
            console.error("❌ Ошибка при создании директории:", error.message);

            // Fallback: пробуем первый доступный диск
            for (const basePath of allFilePath) {
                try {
                    const absolutePath = join(basePath, urlPath);
                    await fs.access(basePath);
                    await fs.mkdir(absolutePath, { recursive: true });

                    console.log(`⚠️ Использован fallback на: ${basePath}`);

                    return {
                        success: true,
                        absolutePath,
                        basePath,
                        fallback: true,
                    };
                } catch (fallbackError) {
                    continue;
                }
            }

            throw new Error("Не удалось создать директорию ни на одном диске");
        }
    }

    // Функция для проверки всех дисков (только информация)
    async checkAllDisksInfo(allFilePath) {
        console.log("=== Информация о дисках ===");

        const results = [];

        for (const path of allFilePath) {
            try {
                await fs.access(path);
                const spaceInfo = await this.getFreeSpace(path);

                if (spaceInfo) {
                    const info = {
                        path,
                        freeGB: spaceInfo.freeGB,
                        freeMB: spaceInfo.freeMB,
                        totalGB: spaceInfo.totalGB,
                        usagePercent: spaceInfo.usagePercent,
                        exists: true,
                    };

                    results.push(info);

                    const status = spaceInfo.freeGB > 5 ? "✅" : spaceInfo.freeGB > 1 ? "⚠️" : "❌";
                    console.log(`${status} ${path}: ${spaceInfo.freeGB} GB свободно`);
                }
            } catch (error) {
                results.push({
                    path,
                    exists: false,
                    error: error.message,
                });
                console.log(`❌ ${path}: недоступен`);
            }
        }

        console.log("===========================\n");
        return results;
    }

    // Пример использования в вашем коде
    async getAbsolutePath(allFilePath, urlPath) {
        // 1. Проверим информацию о всех дисках
        await this.checkAllDisksInfo(allFilePath);

        // 2. Создать директорию на лучшем диске
        const result = await this.createDirectoryWithDiskCheck(allFilePath, urlPath);

        return result.absolutePath; // Возвращаем выбранный absolutePath
    }
}

module.exports = new DiskService();
