const {Sequelize} = require("sequelize")
const {
    pgDatabase,
    pgUser,
    pgPassword,
    dialect,
    host,
} = require('./constant')

module.exports = new Sequelize(
    pgDatabase || "your_variant",
    pgUser || "postgres",
    pgPassword || "your_password",
    {
        dialect: dialect || "postgres",
        host: host || "localhost"    //localhost || docker container name
    }
)