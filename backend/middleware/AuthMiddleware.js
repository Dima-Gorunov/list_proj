const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) { // функция, проверяющая токен пользователя
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
        req.user = decoded    // далее в req.user будет лежать {user:{id,email,username,role}}
        next()
    } catch (e) { // если токен не валиднен, выполнится блок catch
        return res.status(401).json({result_code: 1, message: "no authorized"})
    }
}