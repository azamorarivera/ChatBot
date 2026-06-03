const express = require('express')
const router = express.Router()

const { 
  crearPregunta, 
  obtenerPregunta, 
  responderPregunta, 
  editarPregunta, 
  eliminarPregunta 
} = require('../controladores/preguntasControlador')

router.post('/', crearPregunta)
router.get('/', obtenerPregunta)
router.post('/responder', responderPregunta)
router.put('/:id', editarPregunta)
router.delete('/:id', eliminarPregunta)

module.exports = router
