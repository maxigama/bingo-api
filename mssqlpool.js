const sql = require('mssql')
const config = {
    user: 'node_usr',
    password: 'redondos',
    server: 'DESKTOP-G0TVVJJ\\SQLEXPRESS', 
    database: 'Bingo.Server',
    "port": 1433
  };
 
// promise style:
const pool = new sql.ConnectionPool(config)
const pool2Connect = pool.connect()
 .then(pool => {
  console.log('Connected to MSSQL ' + config.server)
  return pool
})
.catch(err => console.error('Database Connection Failed! Bad Config: ', err));
module.exports = {
  sql, pool, pool2Connect
}
