var express = require('express');
const { pool, sql, pool2Connect } = require('../mssqlpool')

class bingoController {

  async getExtracto(req , res, next){
    try {

      
        const datosSorteo = await pool.request()
        .input('idProvincia',sql.Int , req.param('provincia'))
        .input('idJuego',sql.Int , req.param('juego'))
        .query('select top 1 idProvincia provincia, idJuego juego, sorteo nro_sorteo, ronda nro_ronda from Extracto where idProvincia =  @idProvincia and idJuego = @idJuego');
        var respuesta = {};
        
        if(datosSorteo.recordset.length > 0)
        {
            const numExtracto = await pool.request()
            .input('idProvincia',sql.Int , req.param('provincia'))
            .input('idJuego',sql.Int , req.param('juego'))
            .query('select  orden , numero from Extracto where ronda in (select top 1 ronda from Extracto where idProvincia =  @idProvincia and idJuego = @idJuego)');
 
            //Armamos el modelo
            respuesta = {
              sorteo: datosSorteo.recordset[0].nro_sorteo,
              ronda: datosSorteo.recordset[0].nro_ronda,
              extracto: numExtracto.recordset
            };
            
        }
        res.json(respuesta)

    } catch (error) {
      res.status(500)
      res.send(error.message)
    }    
  }

  async CreateExtracto(req , res){
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
  }
  

  

}

const controller = new bingoController()
module.exports = controller;