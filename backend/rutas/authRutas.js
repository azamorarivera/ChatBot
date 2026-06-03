const express = require('express')
const { registrar, login , me} = require('../controladores/authControlador')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.post('/registrar', registrar)
router.post('/login', login)
router.get('/me', requireAuth, me)

module.exports = router