'user strict';

const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

//local mysql db connection
const connection = mysql.createConnection({
    host     : process.env.HOST_DB,
    user     : process.env.USER_DB,
    password : process.env.PASS_DB,
    database : process.env.DB
});
// connect to database
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;