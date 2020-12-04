//Intercepta las peticiones para ver si las solicitudes tiene el token
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

exports.ensureAuthenticated = function(req, res, next) {
  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({message: "Falta client_id"});
  }
  
  var token = req.headers.authorization.split(" ")[1];
  var claimsJwt = jwt.decode(token, config.client_id);

  console.log(claimsJwt);

  if(claimsJwt.exp <= moment().unix()) {
     return res
        .status(401)
        .send({message: "El token ha expirado"});
  }

  next();
}



  /*pool.request()
  .input('client_id',sql.Int ,claimsJwt.client_id)
  .query('select * from ClienteApi where client_id = @client_id')
  .then(result=> {

    if(result.l)

  });*/