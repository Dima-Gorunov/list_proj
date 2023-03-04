const sequelize = require("../db")
const {DataTypes} = require("sequelize")


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, required: true},
    password: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING, defaultValue: null},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    activated: {type: DataTypes.BOOLEAN, defaultValue: false} // добавил после сборки, далее в postgres добавлю поле
})

const List = sequelize.define('list', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, defaultValue: null}
})

const File = sequelize.define('file', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, required: true},
    type: {type: DataTypes.STRING, required: true},
    path: {type: DataTypes.STRING, defaultValue:''},
})

User.hasMany(List)
List.belongsTo(User)
User.hasMany(File)
File.belongsTo(User)

module.exports = {
    User, List
}