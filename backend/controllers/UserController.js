const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {User, File} = require('../models/models')
const {mkdir} = require('fs/promises');
const {join, resolve} = require('path')
const {fileFolderPath, clientName, JWT_ACCESS_STRING} = require('../constant')
const userService = require('../service/user-service')
const mailService = require('../service/mail-service')
const {validationResult} = require('express-validator')
const UserInfoDto = require('../dtos/userInfoDto')

class UserController {

    async testRegistration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(422).json({result_code: 1, message: errors.array()})
            }
            const {email, password} = req.body
            const userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            res.status(e.status || 500).json({result_code: 1, message: e.message})
        }
    }

    async testLogin(req, res) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            return res.status(e.status || 500).json({result_code: 1, message: e.message})
        }
    }

    async activate(req, res) {
        try {
            const {link} = req.params
            await userService.activate(link)
            return res.redirect(clientName)
        } catch (e) {
            return res.status(500).json({result_code: 1, message: e.message})
        }
    }

    async testLogout(req, res) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            return res.status(e.status || 500).json({result_code: 1, message: e.message})
        }
    }

    async refresh(req, res) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            return res.status(e.status || 500).json({result_code: 1, message: e.message})
        }
    }

    async getInfo(req, res) {
        try {
            const {id} = req.user
            const user = await User.findOne({where: {id}})
            const userInfoDto = new UserInfoDto(user)
            return res.json({user: userInfoDto})
        } catch (e) {
            return res.status(401).json({result_code: 1, message: "get info error"})
        }
    }

    async setAvatar(req, res) {
        try {
            const {fileName, filePath, avatarUrl} = req
            const {id} = req.user
            if (!filePath || !filePath || !avatarUrl || !id) {
                return res.status(400).json({result_code: 1, message: "insufficient data"})
            }
            await User.update({avatar: avatarUrl}, {where: {id}})
            const user = await User.findOne({where: {id}})
            const file = await File.create({name: fileName, type: "avatar", path: filePath, userId: id, url: avatarUrl})
            return res.json({file, user})
        } catch (e) {
            return res.status(401).json({result_code: 1, message: e.message})
        }
    }



    //------------------------------------------------------------

    // disabled
    generateJwt({id, email, activated}) {
        return jwt.sign({id, email, activated},
            JWT_ACCESS_STRING, //process.env.SECRET_KEY,
            {
                expiresIn: '24h'
            })
    }

    // disabled
    async testMethod(req, res) {
        try {
            const {email} = req.body
            await mailService.sendActivationMail("gorunov-01@mail.ru", "vk.com")
            return res.json(1)
        } catch (e) {
            return res.json({result_code: 1, message: e.message})
        }
    }

    // disabled
    async check(req, res) {
        try {
            const {id} = req.user
            const user = await User.findOne({where: {id}})
            const newToken = this.generateJwt(user)
            return res.json({token: newToken}) // jwt.verify(token, process.env.SECRET_KEY)=>{id:user.id...}
        } catch (e) {
            return res.status(401).json({result_code: 1, message: "generate new token error"})
        }
    }

    // disabled
    async getAvatar(req, res) {
        try {
            const {id} = req.user
            const file = await File.findOne({where: {type: "avatar", userId: id}})
            return res.sendFile(file.url)
        } catch (e) {
            return res.status(404).json({result_code: 1, message: "get avatar error"})
        }
    }

    // disabled
    async getAll(req, res) {
        const {id, count, page} = req.query
        if (id) {
            const user = await User.findOne({where: {id}})
            if (!user) {
                return res.status(400).json({result_code: 1, message: `user ${id} not exist`})
            }
            return res.json({user})
        }
        if (count) {
            const user = await User.findAll({limit: count, offset: page})
            if (!user) {
                return res.status(400).json({result_code: 1, message: `users not exist`})
            }
            return res.json({user})
        }
        const users = await User.findAll()
        if (!users) {
            return res.status(400).json({result_code: 1, message: "users not exist"})
        }
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY3NDM4MDA2NSwiZXhwIjoxNjc0NDY2NDY1fQ.-cwiZpaPC2Rgp6kwTyiMu1r8JWvyxhAUN2xlf6miCLo
//        нет доступа
        return res.json({users})
    }

    // disabled
    async getOne(req, res) {
        const user = await User.findOne({where: {id: req.id}})
        if (!user) {
            return res.status(400).json({result_code: 1, message: "user not found"})
        }
        return res.json(user)
    }

    // disabled
    async deleteUser(req, res) {
        const {id} = req.body
        const senId = req.sender.id
        if (senId === id) {
            return res.status(400).json({result_code: 1, message: "вы не можете удалить сами себя"})
        }
        const user = await User.findOne({where: {id}})
        if (!user) {
            return res.status(400).json({result_code: 1, message: "user not found"})
        }
        await User.destroy({where: {id}})
        return res.json(user)
    }

    // disabled
    async updateUser(req, res) {
        const {id, username} = req.body
        await User.update({username: username}, {where: {id}})
        const users = await User.findAll()
        return res.json(users)
    }

    // disabled
    async setRole(req, res) {
        const {id, role} = req.body
        const user = await User.findOne({where: {id}})
        if (!user) {
            return res.json({result_code: 1, message: "user not found"})
        }
        if (user.role === role) {
            return res.json({result_code: 1, message: "the user already has this role"})
        }
        await User.update({role}, {where: {id}}) // ({role: newRole}, {where:{id: id}})
        const updateUser = await User.findOne({where: {id}})
        return res.json({user, updateUser})
    }

    // disabled
    async registration(req, res) {
        const {email, password} = req.body // must be string
        if (!email || !password) {
            return res.status(400).json({result_code: 1, message: "data no correct"})
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return res.status(400).json({result_code: 1, message: "the user exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await User.create({email, password: hashPassword})
        const token = this.generateJwt(user); //первая генерация токена при регистрации
        return res.json({token: token})
    }

    // disabled
    async login(req, res) {    // функция авторизации
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({result_code: 1, message: "insufficient data"})
        }
        const user = await User.findOne({where: {email}})
        if (!user) {
            return res.status(400).json({result_code: 1, message: "incorrect email"})
        }
        const comparePassword = bcrypt.compareSync(password, user.password) // return boolean
        if (!comparePassword) {
            return res.status(400).json({result_code: 1, message: "incorrect password"})
        }
        const token = this.generateJwt(user) // генерируем токен с id, email, password пользователя
        return res.json({
            token: token
        })
    }

}

module.exports = new UserController()