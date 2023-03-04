const express = require('express')
const sequelize = require('./db')
const bodyParser = require('body-parser')
const fileUpload=require('express-fileupload')
const cors = require('cors')
const router = require('./routes/index')
const app = express()

const PORT = process.env.EXTERNAL_PORT || 5000
app.use(fileUpload({}))
app.use(cors())
app.use(express.json())
app.use('/api', router)
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`start on ${PORT} port`)
        )
    } catch (e) {
        console.log(e)
    }
}
start()