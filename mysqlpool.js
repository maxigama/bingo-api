var mysql = require('mysql'); 
const config = {
       
      host: "localhost",
        user: "root",
        password: "328ELMsTZtqQ",
        database: "BingoApiRest"
  };
 
// promise style:
var con = mysql.createConnection(config);

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


module.exports = {
    mysql, con
}
