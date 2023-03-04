const fs = require('fs')


class FilesController {

    async upload(req, res) {
        try {
            const file = req.files.file
            return res.json({file})
        } catch (e) {
            return res.json({message: "error"})
        }

    }

}


module.exports = new FilesController();