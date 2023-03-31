const sequelize = require("../db")
const {DataTypes} = require("sequelize")


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, required: true},
    password: {type: DataTypes.STRING},
    activated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING},
    first_name: {type: DataTypes.STRING},
    last_name: {type: DataTypes.STRING},
    gender: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING, defaultValue: null},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    avatar: {type: DataTypes.STRING}
})

const Token = sequelize.define('token', {
    refreshToken: {type: DataTypes.STRING, required: true}
})

const List = sequelize.define('list', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, defaultValue: null}
})

const File = sequelize.define('file', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, required: true},
    type: {type: DataTypes.STRING},
    path: {type: DataTypes.STRING},
    url: {type: DataTypes.STRING}
})

User.hasMany(List)
List.belongsTo(User)
User.hasMany(File)
File.belongsTo(User)
User.hasOne(Token)
Token.belongsTo(User)
List.hasMany(File)
File.belongsTo(List)

module.exports = {User, List, File, Token}
