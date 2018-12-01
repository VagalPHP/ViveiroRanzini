const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : '',
    database : 'viveiro_ranzini'
  });

exports.conectar = function(){
	return connection;
}