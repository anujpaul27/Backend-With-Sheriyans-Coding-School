const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const dotenv = require('dotenv')
const authRouter = require('./routes/auth.routes')

dotenv.config()


// Middleware 
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)

module.exports = app 