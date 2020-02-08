const mysql = require('mysql');
require('dotenv').config()

var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE
});
 
connection.connect(function (err) {
  if (err) {
    console.error('error connecting to db: ' + err.stack)
    return;
  }

  console.log('DB connected as id ' + connection.threadId)
});

module.exports = connection;