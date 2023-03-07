const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const app = express()
const PORT = process.env.EXTERNAL_PORT || 5000
const {fileFolderPath} = require('./constant')
// app.use(fileUpload({}))
// app.use(express.static(defaultPath+"\\static"))
app.use(cors())
app.use(express.json())
app.use('/api', router)
const start = async () => {
    try {
        for (key in models) {
            await models[key].sync({alter: true})
        }
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`start on ${PORT} port`)
        )
    } catch (e) {
        console.log(e)
    }
}
start()