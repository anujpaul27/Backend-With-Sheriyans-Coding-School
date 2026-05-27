const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter = require('../src/routes/auth.routes')

// Middleware 
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api/auth',authRouter)

module.exports = app 