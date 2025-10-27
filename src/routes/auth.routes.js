const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { JWT_SECRET } = require('../controllers/auth.controller')

// Middleware para verificar token JWT
const verificarToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.token

    if (!token) {
      return res.status(401).json({
        error: true,
        mensaje: 'Token de acceso requerido'
      })
    }

    // Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET)

    // Buscar el usuario en la base de datos
    const usuario = await User.findByPk(decoded.id)
    if (!usuario || !usuario.activo) {
      return res.status(401).json({
        error: true,
        mensaje: 'Token inválido o usuario inactivo'
      })
    }

    // Agregar usuario al request
    req.usuario = usuario
    next()
  } catch (error) {
    console.error('Error en verificación de token:', error)
    res.status(401).json({
      error: true,
      mensaje: 'Token inválido'
    })
  }
}

// Middleware para verificar roles específicos
const verificarRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    try {
      const usuario = req.usuario

      if (!usuario) {
        return res.status(401).json({
          error: true,
          mensaje: 'Usuario no autenticado'
        })
      }

      if (!rolesPermitidos.includes(usuario.rol)) {
        return res.status(403).json({
          error: true,
          mensaje: `Acceso denegado. Se requiere rol: ${rolesPermitidos.join(' o ')}`
        })
      }

      next()
    } catch (error) {
      console.error('Error en verificación de rol:', error)
      res.status(500).json({
        error: true,
        mensaje: 'Error interno del servidor'
      })
    }
  }
}

// Middleware específico para superadmin
const soloSuperadmin = verificarRol('superadmin')

module.exports = {
  verificarToken,
  soloSuperadmin
}

