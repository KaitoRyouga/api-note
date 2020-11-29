'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'sql.kaito.ninja',
    user     : 'kr',
    password : 'Kaito1@3',
    database : 'NoteManager'
});
// connect to database
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;