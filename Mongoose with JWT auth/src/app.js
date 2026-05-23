const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()


// Middleware 
app.use(express())
app.use(cors())



module.exports = app 