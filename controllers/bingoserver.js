var express = require('express');
const { con, mysql } = require('../mysqlpool')

class bingoController {

  async getExtracto(req , res, next){
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
  }

  /*async CreateExtracto(req , res){
    try {

      var extracto = req.body;
      const result = await pool.request()
      .input('provincia',sql.Int ,  extracto.provincia)
      .input('juego',sql.Int , extracto.juego)
      .input('sorteo',sql.Int , extracto.sorteo)
      .input('ronda',sql.Int , extracto.ronda)
      .input('numero',sql.Int , extracto.numero)      
      .input('orden',sql.Int , extracto.orden)
      .query('INSERT INTO [dbo].[Extracto] ([idProvincia],[idJuego],[sorteo],[ronda],[fecha],[numero],[orden]) VALUES (@provincia,@juego,@sorteo,@ronda,getdate(),@numero,@orden)');    

      return  res.sendStatus(200);

    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }*/
  

  

}

const controller = new bingoController()
module.exports = controller;