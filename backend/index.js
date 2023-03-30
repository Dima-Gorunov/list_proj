const {fileFolderPath, clientName} = require("./constant");
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const app = express()
const PORT = process.env.EXTERNAL_PORT || 5000
const cookieParser = require('cookie-parser')

app.use(cors(
    {
        credentials: true,
        origin: clientName
    }
))
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)
app.use('/', express.static(fileFolderPath))

app.use(function (err, req, res, next) {
    return res.status(err.status || 500).json({status_code: 1, message: err.message});
});

const start = async () => {
    try {
        for (key in models) {
            await models[key].sync({alter: true})
        }
        await sequelize.authenticate() // if {force:true} => all data=0
        await sequelize.sync()
        app.listen(PORT, () => console.log(`start on ${PORT} port`)
        )
    } catch (e) {
        console.log(e)
    }
}
start()