const {List} = require('../models/models')


class ListController {

    async create(req, res) {
        const {text} = req.body
        const obj = await List.findOne({where: {text}})
        if (obj) {
            return res.json({result_code: 1, message: "exist"})
        }
        const list = await List.create({text})
        return res.json(list)
    }

    async update(req, res) {
        const {id, newText} = req.body
        const list = await List.update({text: newText},
            {where: {id}})
        return res.json(list)
    }

    async deleteList(req, res) {
        const {id} = req.body
        const list = await List.destroy({where: {id: id}})
        return res.json(list)
    }

    async getAll(req, res) {
        const lists = await List.findAll()
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