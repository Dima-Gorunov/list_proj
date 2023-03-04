const {Sequelize} = require("sequelize")


module.exports = new Sequelize(
    "file_img",
    "postgres",
    "2001ah2002",
    {
        dialect: "postgres",
        host: "localhost"
    }
    /*process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        dialect: `postgres`,
        host: process.env.PGHOST
    }*/
)