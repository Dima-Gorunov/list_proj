const {Sequelize} = require("sequelize")
const {
    pgDatabase,
    pgUser,
    pgPassword,
    dialect,
    host,
} = require('./constant')

module.exports = new Sequelize(
    "file_img",      //file_img
    "postgres",     //postgres
    "2001ah2002",   //2001ah2002
    {
        dialect: "postgres", //postgres
        host: "localhost"    //localhost || docker container name
    }
    /*process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        dialect: `postgres`,
        host: process.env.PGHOST
    }*/
)