const sequelize = require("../db")
const {DataTypes} = require("sequelize")

const List = sequelize.define('list', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING}
})

module.exports = {
    List
}