const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const dotenv = require('dotenv')
const router = require('./routes/auth.routes')
dotenv.config()


// Middleware 
app.use(express.json())
app.use(cors())

app.use('/api/auth', router)

module.exports = app 