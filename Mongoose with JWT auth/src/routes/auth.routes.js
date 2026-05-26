const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/auth.controler')

/**
 *  POST /api/auth/register
 */
authRouter.post('/register', authController.register)

/**
 * GET /api/auth/login
 */
authRouter.get('/login',authController.LogIn)

/**
 * GET /api/auth/refresh-token 
 */
authRouter.get('/refresh-token',authController.refreshToken)

/**
 * GET /api/auth/logout
 */
// authRouter.get('/logout', )

module.exports = authRouter