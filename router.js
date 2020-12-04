const express =  require('express');
//const bingocontroller = require('./controllers/bingo')
const { con, mysql } = require('./mysqlpool')
var interceptor = require('./interceptor');
const router = express.Router();

//router.get('/bingo/:provincia/:juego', interceptor.ensureAuthenticated, bingocontroller.getExtracto); ////

router.get('/', function (req , res, next){
    try {

      var respuesta = {};

      con.query(
        'select top 1 idProvincia provincia, idJuego juego, sorteo nro_sorteo, ronda nro_ronda from Extracto where idProvincia = 20 and idJuego = 21', 
        (err, result) => {
          if (err) throw err;
      
          console.log(`select ${result.affectedRows} row(s)`);
        
        if(result.recordset.length > 0)
        {
          con.query(
             'select  orden , numero from Extracto where ronda in (select top 1 ronda from Extracto where idProvincia = 20 and idJuego = 21',
             (err, result2) => {
              if (err) throw err;
      
              console.log(`select ${result2.affectedRows} row(s)`);

            //Armamos el modelo
              respuesta = {
                sorteo: result.recordset[0].nro_sorteo,
                ronda: result.recordset[0].nro_ronda,
                extracto: result2.recordset
              };
            }); 
        }

        res.json(respuesta)
          
        }
      );

    } catch (error) {
      res.status(500)
      res.send(error.message)
    }    
  });

//router.post('/bingo', interceptor.ensureAuthenticated, bingocontroller.CreateExtracto);

module.exports = router;