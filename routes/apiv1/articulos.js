'use strict';

const express = require('express');
const router = express.Router();

const Anuncios = require('../../models/Anuncios');


//GET//
router.get('/', async (req, res, next) => { 
  try {

    // recogemos parámetros de entrada
    const name = req.query.name;
    const price = req.query.price;
    const tags  = req.query.tags;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;
    const fields = req.query.fields;

    console.log(req.query)

    const filtro = {};

    if (typeof name !== 'undefined') { // si me piden filtrar por nombre...
      filtro.name = name; // lo añado al filtro
    }

    if (typeof price !== 'undefined') {
      filtro.price = price;
    }
    if (typeof tags !== 'undefined') {
        filtro.tags = tags;
      }
  

    const docs = await articulos.listar(filtro, skip, limit, sort, fields); // si usamos await, la función donde estoy
                                        // debe tener async
    
    res.json({ success: true, result: docs });  
  } catch(err) {
    next(err);
    return;
  }  
});

// POST /

router.post('/', (req, res, next) => {
  console.log(req.body);

  const data = req.body;
  
  // creamos documento en memoria
  const articulo = new Anuncios(data);
  
  // lo persistimos en la base de datos
  Anuncio.save((err, anuncioGuardado) => { // .save es método de instancia
    if (err) {
      next(err);
      return;
    }
    res.json({ success: true, result: anuncioGuardado });
  });
});

// DELETE /

router.delete('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    await Anuncio.remove({_id: _id}).exec(); // .remove es método estático
    res.json({ success: true });
  } catch(err) {
    next(err);
    return;
  }
});

// PUT /

router.put('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    const data = req.body;

    const anuncioActualizado = await Anuncios.findByIdAndUpdate(_id, data, { 
      new: true // esto es para obtener la nueva versión del documento
                // tras actualizarlo
    });
    
    res.json({ success: true, result: anuncioActualizado });

  } catch(err) {
    next(err);
    return;
  }
});

module.exports = router;
