const {
    clientNameDev, dialectDev, hostDev,
    JWT_ACCESS_STRING_DEV,
    JWT_REFRESH_STRING_DEV,
    pgDatabaseDev, pgPasswordDev, pgUserDev,
    serverNameDev, smtpHostDev, smtpPasswordDev, smtpPortDev, smtpUserDev
} = require("./constantDev");

const {join} = require('path')
const moment = require('moment')

//-------------------------------------------------------------------------------
//   Path
const defaultPath = __dirname
const fileFolderPath = join(__dirname + "/../files/")
//-------------------------------------------------------------------------------
//   Server data
const serverName = process.env.SERVER_NAME || serverNameDev
const clientName = process.env.CLIENT_NAME || clientNameDev
const JWT_ACCESS_STRING = process.env.JWT_ACCESS_STRING || JWT_ACCESS_STRING_DEV
const JWT_REFRESH_STRING = process.env.JWT_REFRESH_STRING || JWT_REFRESH_STRING_DEV
//-------------------------------------------------------------------------------
//   Database config
const pgDatabase = process.env.PGDATABASE || pgDatabaseDev
const pgUser = process.env.PGUSER || pgUserDev
const pgPassword = process.env.PGPASSWORD || pgPasswordDev
const dialect = process.env.DIALECT || dialectDev
const host = process.env.PGHOST || hostDev
//-------------------------------------------------------------------------------
//   SMTP config
const smtpHost = process.env.SMTP_HOST || smtpHostDev
const smtpPort = parseInt(process.env.SMTP_PORT || smtpPortDev)
const smtpUser = process.env.SMTP_USER || smtpUserDev
const smtpPassword = process.env.SMTP_APP_PASSWORD || smtpPasswordDev
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