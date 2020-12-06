var mysql = require('mysql'); 
const config = {
       
      host: "us-cdbr-east-02.cleardb.com",
        user: "b9a9761fa59248",
        password: "f971e9e2",
        database: "heroku_1771ca38fd136df"
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

//mysql://b9a9761fa59248:f971e9e2@us-cdbr-east-02.cleardb.com/heroku_1771ca38fd136df?reconnect=true