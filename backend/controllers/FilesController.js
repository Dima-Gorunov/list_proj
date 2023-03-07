const fs = require('fs')
const path = require('path')

class FilesController {
    async upload(req, res) {
        try {
            const file = req.file
            const user = req.user
            // file.mv(__dirname + "/gg")

            return res.json({file, user})
        } catch (e) {
            return res.json({message: "error"})
        }
    }
}

// setInterval(()=>{
//     fs.readdir('../',(err, data)=>{
//         console.log(data);
//     })
// },1000)

module.exports = new FilesController();