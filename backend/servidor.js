const app = require('./app.js')
const dotenv = require('dotenv')

dotenv.config()
const PUERTO = process.env.PUERTO || 5000

app.listen(PUERTO, () => {
    console.log(`Servidor esta corriendo en el puerto ${PUERTO}`)
    
})