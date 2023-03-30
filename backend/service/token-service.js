const {Token} = require("../models/models");
const jwt = require("jsonwebtoken")

const {JWT_REFRESH_STRING, JWT_ACCESS_STRING} = require('../constant')

class TokenService {

    async validateAccessToken(accessToken) {
        try {
            const userData = jwt.verify(accessToken, JWT_ACCESS_STRING)
            return userData
        } catch (e) {
            return null
        }
    }

    async validateRefreshToken(refreshToken) {
        try {
            const userData = jwt.verify(refreshToken, JWT_REFRESH_STRING)
            return userData
        } catch (e) {
            return null
        }
    }

    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_STRING, {expiresIn: '24h'})
        const refreshToken = jwt.sign(payload, JWT_REFRESH_STRING, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({where: {userId: userId}})
        if (tokenData) {
            const newTokenData = await Token.update({refreshToken: refreshToken}, {where: {userId: userId}})
            return newTokenData
        }
        const token = await Token.create({userId: userId, refreshToken})
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.destroy({where: {refreshToken}})
        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({where: {refreshToken}})
        return tokenData
    }
}

module.exports = new TokenService()