const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const morgan = require('morgan')
const authRouter = require('./routes/auth.routes')



// Middleware 
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api/auth', authRouter)

module.exports = app 