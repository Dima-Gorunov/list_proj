const {Op} = require("sequelize");

const {User} = require("../models/models");
const sequelize = require("sequelize")
const {File} = require('../models/models')
const {fileFolderPath} = require('../constant')
const {join} = require('path')

class FilesController {
    async upload(req, res) {
        try {
            const {fileName, filePath, fullUrl} = req
            const {id} = req.user
            if (!fileName || !filePath || !fullUrl) {
                return res.json({
                    result_code: 1,
                    message: `insufficient data`
                })
            }
            const file = await File.create({name: fileName, path: filePath, userId: id, url: fullUrl})
            return res.json({file})

        } catch (e) {
            return res.json({result_code: 1, message: e.message})
        }
    }

    async getFile(req, res) {
        try {
            const file = join(fileFolderPath + "/user_3/images/09032023-124921-877-1.Desktop_230228_1556.jpg")
            return res.sendFile(file)
        } catch (e) {
            return res.json({message: "error"})
        }
    }

    async update(req, res) {
        const searchString = '\\\\'
        const replaceString = "/"
        await File.update(
            {url: sequelize.fn('replace', sequelize.col('url'), searchString, replaceString)},
            {where: {url: {[Op.like]: `%${searchString}%`}}}
        )
        const files = await File.findAll()
        return res.json(files)
    }

    async delete(req, res) {
        await File.destroy({
            where: {url: null}
        })
        const files = await File.findAndCountAll()
        return res.json(files)
    }
}

module.exports = new FilesController();