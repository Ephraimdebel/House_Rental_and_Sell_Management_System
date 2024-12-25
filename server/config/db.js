const mysql2 = require("mysql2")
const dbConnection = mysql2.createPool({
    user: process.env.USER,
    database: process.env.DATABASE,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    connectionLimit: process.env.CONNECTION_LIMIT,
})
// console.log(process.env.DATABASE)
module.exports = dbConnection.promise()