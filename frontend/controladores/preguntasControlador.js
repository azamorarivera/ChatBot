const Pregunta = require('../modelos/Pregunta')
const stringSimilarity = require('string-similarity')

exports.crearPregunta = async (req, res) => {
  try {
    const { pregunta, respuesta } = req.body
    const nuevaPregunta = new Pregunta({ pregunta, respuesta })
    await nuevaPregunta.save()
    res.status(201).json(nuevaPregunta)
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la pregunta", error: error.message })
  }
}

exports.obtenerPregunta = async (req, res) => {
  try {
    const preguntas = await Pregunta.find()
    res.status(200).json(preguntas)
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener preguntas", error: error.message })
  }
}

exports.responderPregunta = async (req, res) => {
  try {
    const { pregunta } = req.body
    const preguntas = await Pregunta.find()

    if (!preguntas.length) return res.status(404).json({ mensaje: "No hay preguntas registradas" })

    const textos = preguntas.map(p => p.pregunta)
    const resultado = stringSimilarity.findBestMatch(pregunta, textos)
    const mejorIndice = resultado.bestMatchIndex

    res.status(200).json({ respuesta: preguntas[mejorIndice].respuesta })
  } catch (error) {
    res.status(500).json({ mensaje: "Error al responder la pregunta", error: error.message })
  }
}

exports.editarPregunta = async (req, res) => {
  try {
    const { id } = req.params
    const { pregunta, respuesta } = req.body

    const preguntaActualizada = await Pregunta.findByIdAndUpdate(
      id,
      { pregunta, respuesta },
      { new: true }
    )

    if (!preguntaActualizada) {
      return res.status(404).json({ mensaje: "Pregunta no encontrada" })
    }

    res.status(200).json(preguntaActualizada)
  } catch (error) {
    res.status(500).json({ mensaje: "Error al editar la pregunta", error: error.message })
  }
}

exports.eliminarPregunta = async (req, res) => {
  try {
    const { id } = req.params
    const preguntaEliminada = await Pregunta.findByIdAndDelete(id)

    if (!preguntaEliminada) {
      return res.status(404).json({ mensaje: "Pregunta no encontrada" })
    }

    res.status(200).json({ mensaje: "Pregunta eliminada correctamente" })
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la pregunta", error: error.message })
  }
}
