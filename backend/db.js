const {Sequelize} = require("sequelize")


module.exports = new Sequelize(
    "my_test_db",
    "postgres",
    "2001ah2002",
    {
        dialect: 'postgres',
        host: 'localhost'
    }
)