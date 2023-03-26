const {Sequelize} = require("sequelize")
const {
    pgDatabase,
    pgUser,
    pgPassword,
    dialect,
    host,
} = require('./constant')

module.exports = new Sequelize(
    pgDatabase,
    pgUser,
    pgPassword,
    {
        dialect: dialect,
        host: host     // localhost, docker container name...
    }
)