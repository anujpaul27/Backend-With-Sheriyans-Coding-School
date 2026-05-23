const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controler')

router.post('/register', authController.register)



module.exports = router