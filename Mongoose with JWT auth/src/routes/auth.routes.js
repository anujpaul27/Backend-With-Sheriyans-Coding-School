const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/auth.controler')

authRouter.post('/register', authController.register)
authRouter.get('/login',authController.LogIn)
authRouter.get('/refresh-token',authController.refreshToken)



module.exports = authRouter