const express = require('express')
const app = express()
const route = require('./routers/index')

app.use('/api',route)

module.exports = app