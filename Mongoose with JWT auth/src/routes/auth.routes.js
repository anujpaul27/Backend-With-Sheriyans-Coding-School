const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/auth.controler')

authRouter.post('/register', authController.register)
authRouter.post('/login',authController.LogIn)



module.exports = authRouter