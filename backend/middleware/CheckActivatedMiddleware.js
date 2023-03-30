module.exports = async function (req, res, next) {
    try {
        if (req.method === 'OPTIONS') {
            next()
        }
        if (!req.user.activated) {
            return res.status(401).json({result_code: 1, message: "user is no activated"})
        }
        next()
    } catch (e) {
        return res.status(401).json({result_code: 1, message: e.message})
    }

}