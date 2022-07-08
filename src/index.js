const express = require('express')
const app = express()
const route = require('./routers/index')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/api',route)

module.exports = app