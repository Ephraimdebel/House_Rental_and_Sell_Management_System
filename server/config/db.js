// db.js (or wherever your DB configuration is)
const mysql2 = require("mysql2");
require("dotenv").config();

const dbConnection = mysql2.createPool({
  user: process.env.USER,
  database: process.env.DATABASE,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  connectionLimit: Number(process.env.CONNECTION_LIMIT),
});

// console.log(process.env.database)// Export the promise-based query function
// const query = (sql, params) => {
//   return new Promise((resolve, reject) => {
//     dbConnection.query(sql, params, (error, results) => {
//       if (error) {
//         return reject(error);
//       }
//       resolve(results);
//     });
//   });
// };

module.exports = dbConnection.promise();
