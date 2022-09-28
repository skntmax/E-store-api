var mysql      = require('mysql');
 
var connection = mysql.createConnection({
  host     : '216.48.177.88',
  user     : 'rozgar_user',
  password : 'damnlol_0346',
  database : 'e_store'
});
 
connection.connect(function (err) {
    if(err){
        console.log("error occurred while connecting");
    }
    else{
        console.log("connection created with Mysql successfully");
    }
 });
 
// connection.end();


module.exports = {connection}