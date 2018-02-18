'use strict';

const mongoose = require('mongoose');

// primero definimos un esquema
var anuncioSchema = mongoose.Schema({
    nombre: { type: String, index: true },
    venta: { type: Boolean, index: true },
    precio: { type: Number, index: true },
    foto: String,
    tags: { type: Array, index: true }
  });
  
// creamos un método estático (del modelo)
anuncioSchema.statics.listar = function(filtro, skip, limit, sort, fields, callback) {
  // obtenemos la query sin ejecutarla
  const query = Anuncio.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  //Devolvemos la query 
  return query.exec(callback);
};

// creamos el modelo
const Anuncio = mongoose.model('Anuncios', anuncioSchema);

// exportamos el modelo
module.exports = Anuncio;
