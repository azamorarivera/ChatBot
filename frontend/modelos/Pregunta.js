const mongoose = require('mongoose')

const esquemaPregunta = new mongoose.Schema({
    pregunta: {type: String, required: true },
    respuesta:{type:String, required:true}
})

module.exports = mongoose.model('Pregunta', esquemaPregunta)