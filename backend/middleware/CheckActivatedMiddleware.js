const { User } = require("../models/models");

module.exports = async function (req, res, next) {
    try {
        if (req.method === "OPTIONS") {
            next();
        }
        const senderId = req.user.id; //sender
        const user = await User.findOne({ where: { id: senderId } });
        if (!user.activated) {
            return res.status(403).json({ result_code: 1, message: "user is no activated. Confirm your email" });
        }
        next();
    } catch (e) {
        return res.status(403).json({ result_code: 1, message: e.message });
    }
};
