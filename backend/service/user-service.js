const {User} = require("../models/models");
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/userDto')
const {serverName} = require('../constant')

class UserService {
    async registration(email, password) {
        const candidate = await User.findOne({where: {email}}) // {email: email}
        if (candidate) {
            const error = new Error(`User with email ${email} already exists`)
            error.status = 422
            throw error
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const activationLink = uuid.v4()
        const user = await User.create({email, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, `${serverName}api/user/activate/${activationLink}`)
        const userDto = new UserDto(user)
        const tokens = await tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await User.findOne({where: {activationLink}})
        if (!user) {
            const error = new Error(`User not found`)
            error.status = 403
            throw error
        }
        await User.update({activated: true}, {where: {activationLink}})
    }

    async login(email, password) {
        const user = await User.findOne({where: {email}})
        if (!user) {
            const error = new Error(`User not found`)
            error.status = 403
            throw error
        }
        const comparePassword = bcrypt.compareSync(password, user.password) // return boolean
        if (!comparePassword) {
            const error = new Error(`incorrect password`)
            error.status = 401
            throw error
        }
        const userDto = new UserDto(user)
        const tokens = await tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            const error = new Error(`incorrect refreshToken`)
            error.status = 401
            throw error
        }

        const userData = await tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            const error = new Error(`ref token||userData not fount`)
            error.status = 401
            throw error
        }
        const user = await User.findOne({where: {id: userData.id}})
        const userDto = new UserDto(user)
        const tokens = await tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }
}

module.exports = new UserService()