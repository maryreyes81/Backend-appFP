const express = require('express') // CJS
const router = express.Router()
const { registro, login, crearUsuario } = require('../controllers/auth.controller')
const { verificarToken, soloSuperadmin } = require('../middlewares/auth.middleware')

// Rutas públicas
router.post('/registro', registro)
router.post('/login', login)

// Rutas protegidas
router.post('/crear-usuario', verificarToken, soloSuperadmin, crearUsuario)

module.exports = router
