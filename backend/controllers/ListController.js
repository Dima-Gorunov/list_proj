const {User} = require("../models/models");

const {List} = require('../models/models')

class ListController {

    async create(req, res) {
        try {
            const {text, userId} = req.body
            if (!text || !userId) {
                return res.status(401).json({result_code: 1, message: "request error (paste text, userId)"})
            }
            const obj = await List.findOne({where: {text, userId}})
            if (obj) {
                return res.status(401).json({result_code: 1, message: "list exist"})
            }
            const list = await List.create({text, userId})

            return res.json(list)
        } catch (e) {
            return res.status(401).json({result_code: 1, message: "ERROR"})
        }
    }

    async update(req, res) {
        const {id, newText} = req.body
        const list = await List.update({text: newText},
            {where: {id}})
        return res.json(list)
    }

    async deleteList(req, res) {
        const {id} = req.body
        const user = req.user
        const list = await List.findOne({where: {id: id, userId: user.id}})
        if (!list) {
            return res.status(401).json({result_code: 1, message: "list not found"})
        }
        await List.destroy({where: {id: id}})
        return res.json(list)
    }

    async getAllDev(req, res) {
        const lists = await List.findAll()
        return res.json(lists)
    }

    async getAll(req, res) {
        const {userId} = req.query
        if (!userId || userId === "null") {
            return res.status(400).json({result_code: 1, message: "incorrect request (paste userId)"})
        }
        const lists = await List.findAll({where: {userId: req.query.userId}})
        if (!lists || lists.length === 0) {
            return res.json({result_code: 1, message: "list not exist"})
        }
        return res.json(lists)
    }

    async getOne(req, res) {
        const {text} = req.body
        const list = await List.findOne({where: {}})
        if (!list) {
            return res.json({result_code: 1, message: "does not exist"})
        }
        return res.json(list)
    }

}

module.exports = new ListController()