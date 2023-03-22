const uuid = require('uuid')
const path = require('path')
const {User} = require("../models/models");
const {List} = require('../models/models')
const {File} = require('../models/models')
const fs = require('fs')
const {join} = require("path")

class ListController {

    async create(req, res) {
        try {
            const {text} = req.body  // formdata.append("text", "hello")
            const {id} = req.user
            const {postImgUrl, fileName, filePath} = req
            if (!id) {
                return res.status(400).json({result_code: 1, message: "request error (!userId)"})
            }
            const list = await List.create({text: text || null, userId: id, img: postImgUrl || null})
            if (postImgUrl && fileName && fileName) {
                const file = await File.create({name: fileName, type: "post", path: filePath, url: postImgUrl})
                return res.json(list)
            }
            return res.json(list)
        } catch (e) {
            return res.status(403).json({result_code: 1, message: e.message})
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
        const list = await List.findOne({where: {id: id}})
        if (!list) {
            return res.status(400).json({result_code: 1, message: "list not found"})
        }
        if (list.img) {
            const file = await File.findOne({where: {url: list.img}})
            console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeee")
            console.log(list.img)
            console.log(file)
            await File.destroy({where: {url: list.img}}).then(() => {
                fs.unlink(join(file.path + "/" + file.name), (err) => {
                    console.log(err);
                })
            })
        }
        await List.destroy({where: {id: id}})
        return res.json(list)
    }

    async getAllDev(req, res) {
        const lists = await List.findAll()
        return res.json(lists)
    }

    async getAll(req, res) {
        try {
            const {id} = req.user
            if (!id || id === "null") {
                return res.status(400).json({result_code: 1, message: "incorrect request (!userId)"})
            }
            const lists = await List.findAll({where: {userId: id}})
            if (!lists || lists.length === 0) {
                return res.status(400).json({result_code: 1, message: "list not exist"})
            }
            return res.json(lists)
        } catch (e) {
            return res.status(500).json({result_code: 1, message: e.message})
        }
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