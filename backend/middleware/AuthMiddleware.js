const tokenService = require('../service/token-service')
module.exports = async function (req, res, next) { // функция, проверяющая токен пользователя
    try {
        if (req.method === 'OPTIONS') {
            next()
        }
        const accessToken = await req.headers.authorization.split(' ')[1]   // цепляет токен из браузера

        if (!accessToken) {
            console.log("!accessToken")
            return res.status(401).json({result_code: 1, message: "no authorized (accessToken)"})
        }
        const userData = await tokenService.validateAccessToken(accessToken)
        if (!userData) {
            return res.status(401).json({result_code: 1, message: "verify no complete"})
        }
        req.user = userData
        console.log(req.user);
        next()
    } catch (e) { // если токен не валиднен, выполнится блок catch
        console.log(e.message);
        return res.status(401).json({result_code: 1, message: e.message})
    }
}