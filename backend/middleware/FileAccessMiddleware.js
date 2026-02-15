const { File, User } = require("../models/models");
const tokenService = require("../service/token-service");
module.exports = async function (req, res, next) {
    // функция, проверяющая токен пользователя
    try {
        if (req.method === "OPTIONS") {
            next();
        }
        console.log("FileAccessMiddleware originalUrl: ", req.originalUrl);

        const findFile = await File.findOne({ where: { userId: req.user.id, originalUrl: req.originalUrl } });
        console.log("findFile FileAccessMiddleware: ", findFile.originalUrl, " and ", req.originalUrl);

        if (!findFile) {
            return res.status(403).json({ result_code: 1, message: "Access denied" });
        }
        next();
    } catch (e) {
        // если токен не валиднен, выполнится блок catch
        console.log(e.message);
        return res.status(403).json({ result_code: 1, message: e.message });
    }
};
