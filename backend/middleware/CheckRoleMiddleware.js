const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
module.exports = function (role) {
    return async function (req, res, next) { // функция, проверяющая токен пользователя
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]   // цепляет токен из браузера
            if (!token) {
                return res.status(401).json({result_code: 1, message: "no authorized (!token)"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY) // example: => {id: 13} т.к кодируем только id
                                                                      // если функция не выполнится => исключение
            const user = await User.findOne({where: {id: decoded.id}})
            if (user.role !== role) {
                return res.status(403).json({result_code: 1, message: "no access"})
            }
            req.sender = decoded
            next()
        } catch (e) { // если токен не валиднен, выполнится блок catch
            return res.status(401).json({result_code: 1, message: "invalid token"})
        }
    }
}