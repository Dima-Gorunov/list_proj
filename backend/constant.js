const {join} = require('path')
const moment = require('moment')
const defaultPath = __dirname
const fileFolderPath = join(__dirname + "/../files/")


const serverName = process.env.SERVER_NAME || 'http://localhost:5000'
const clientName = process.env.CLIENT_NAME || 'http://localhost:3000'
const JWT_ACCESS_STRING = process.env.JWT_ACCESS_STRING || "some_string_access"
const JWT_REFRESH_STRING = process.env.JWT_REFRESH_STRING || "some_string_refresh"
//-------------------------------------------------------------------------------
//   Database config
const pgDatabase = process.env.PGDATABASE || "file_img"
const pgUser = process.env.PGUSER || "postgres"
const pgPassword = process.env.PGPASSWORD || "password"
const dialect = process.env.DIALECT || "postgres"
const host = process.env.PGHOST || "localhost"
//-------------------------------------------------------------------------------
//   SMTP config
const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com"
const smtpPort = process.env.SMTP_PORT || 587
const smtpUser = process.env.SMTP_USER || "your@gmail.com"
const smtpPassword = process.env.SMTP_APP_PASSWORD || "app_password"
//-------------------------------------------------------------------------------
const generateFileName = (originalName) => `${moment().format('DDMMYYYY-HHmmss-SSS')}_${originalName}`
const createAbsolutePath = (path) => join(fileFolderPath + "/" + path)
// for static images || files
const createFullUrl = (urlPath, fileName) => serverName + "/" + urlPath + fileName

module.exports = {
    pgDatabase,
    pgUser,
    pgPassword,
    dialect,
    host,
    defaultPath,
    clientName,
    fileFolderPath,
    serverName,
    smtpHost,
    smtpPort,
    smtpUser,
    smtpPassword,
    JWT_ACCESS_STRING,
    JWT_REFRESH_STRING,
    createFullUrl,
    generateFileName,
    createAbsolutePath
}