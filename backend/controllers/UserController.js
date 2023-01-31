const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {User} = require('../models/models')

const generateJwt = ({id, email, role, username}) => {
    return jwt.sign({id, email, role, username},
        process.env.SECRET_KEY,
        {
            expiresIn: '24h'
        })
}

class UserController {

    async registration(req, res) {
        const {email, password} = req.body
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
        const token = generateJwt(user); //первая генерация токена при регистрации
        return res.json({token: token})
    }

    async login(req, res) {    // функция авторизации
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return res.status(400).json({result_code: 1, message: "incorrect email"})
        }
        const comparePassword = bcrypt.compareSync(password, user.password) // return boolean
        if (!comparePassword) {
            return res.status(400).json({result_code: 1, message: "incorrect password"})
        }
        const token = generateJwt(user) // генерируем токен с id, email, password пользователя
        return res.json({
            token: token
        })
    }

    async check(req, res) {  // эта функция выполнится только если есть валидный токен
        const token = generateJwt(req.user) // генерируем новый токен после повторной авторизации только с id пользователя
        return res.json({token: token}) // jwt.verify(token, process.env.SECRET_KEY)=>{id:user.id...}
    }

    async getAll(req, res) {
        const {id, count, page} = req.query
        if (id) {
            const user = await User.findOne({where: {id}})
            if (!user) {
                return res.status(400).json({result_code: 1, message: `user ${id} not exist`})
            }
            return res.json(user)
        }
        if (count) {
            const user = await User.findAll({limit: count, offset: page})
            if (!user) {
                return res.status(400).json({result_code: 1, message: `users not exist`})
            }
            return res.json(user)
        }
        const user = await User.findAll()
        if (!user) {
            return res.status(400).json({result_code: 1, message: "users not exist"})
        }
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY3NDM4MDA2NSwiZXhwIjoxNjc0NDY2NDY1fQ.-cwiZpaPC2Rgp6kwTyiMu1r8JWvyxhAUN2xlf6miCLo
//        нет доступа
        return res.json(user)
    }

    async getOne(req, res) {
        const user = await User.findOne({where: {id: req.id}})
        if (!user) {
            return res.status(400).json({result_code: 1, message: "user not found"})
        }
        return res.json(user)
    }

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

    async updateUser(req, res) {
        const {id, username} = req.body
        await User.update({username: username}, {where: {id}})
        const users = await User.findAll()
        return res.json(users)
    }

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
}

module.exports = new UserController()